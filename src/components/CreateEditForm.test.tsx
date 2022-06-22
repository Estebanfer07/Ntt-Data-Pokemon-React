import { CreateEditForm } from "./CreateEditForm";
import { fireEvent, render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer, { setCurrPokemon } from "../reducers/pokemonReducer";
import { Provider } from "react-redux";
import { Pokemon } from "../models/pokemon";
import { act } from "react-dom/test-utils";

const mockStartEdittingPokemon = jest.fn();
const mockStartCreatingPokemon = jest.fn();

jest.mock("../actions/pokemon", () => ({
  startEdittingPokemon: (id: number, pokemon: Pokemon) => {
    return () => mockStartEdittingPokemon;
  },
  startCreatingPokemon: (pokemon: Pokemon) => {
    return () => mockStartCreatingPokemon(pokemon);
  },
}));

// jest.mock("../reducers/pokemonReducer", () => ({
//   toggleForm: (newState: boolean) => {
//     return () => mockToggleForm(newState);
//   },
// }));

const store = configureStore({
  reducer: {
    pokemons: pokemonReducer,
  },
});

const pokemon: Pokemon = {
  id: 645,
  name: "Pikachu",
  image:
    "https://imagenpng.com/wp-content/uploads/2016/09/Pikachu-png-1-635x624.png",
  type: "fire",
  hp: 0,
  attack: 50,
  defense: 50,
  idAuthor: 1,
  created_at: new Date("2022-02-24T16:09:23.247Z").toString(),
  updated_at: new Date("2022-03-05T22:55:29.095Z").toString(),
};

describe("Slider Component", () => {
  let container: HTMLElement;
  let nameInput: HTMLInputElement;
  let imgInput: HTMLElement;

  beforeEach(() => {
    const compnent = render(
      <Provider store={store}>
        <CreateEditForm />
      </Provider>
    );
    container = compnent.container;
    nameInput = screen.getByPlaceholderText("Nombre");
    imgInput = screen.getByPlaceholderText("Url");
    jest.clearAllMocks();
  });

  test("should call action to create pokemon after verifying if form is valid", () => {
    const submitBtn = screen.getByText(/Guardar/i);

    fireEvent.click(submitBtn);
    expect(mockStartCreatingPokemon).not.toHaveBeenCalled();

    fireEvent.change(nameInput, { target: { name: "name", value: "test" } });
    fireEvent.change(imgInput, {
      target: { name: "image", value: "http://wwww.test.com" },
    });
    fireEvent.click(submitBtn);
    expect(mockStartCreatingPokemon).toHaveBeenCalled();
  });

  test("should charge form fields with data from selected pokemon and save as edditing", () => {
    const submitBtn = screen.getByText(/Guardar/i);

    act(() => {
      store.dispatch(setCurrPokemon(pokemon));
    });

    expect(nameInput.value).toBe(pokemon.name);

    fireEvent.change(nameInput, { target: { name: "name", value: "test" } });
    fireEvent.click(submitBtn);
    expect(mockStartCreatingPokemon).not.toHaveBeenCalled();
    expect(mockStartEdittingPokemon).not.toHaveBeenCalledWith({
      ...pokemon,
      name: "test",
    });
  });

  test("should close form", () => {
    const closeBtn = screen.getByText(/cancelar/i);
    fireEvent.click(closeBtn);

    expect(store.getState().pokemons.openForm).toBeFalsy();
  });
});
