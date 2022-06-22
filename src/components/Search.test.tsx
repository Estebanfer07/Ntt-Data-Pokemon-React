import { Search } from "./Search";
import { fireEvent, render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "../reducers/pokemonReducer";
import { Provider } from "react-redux";

const mockStartChargingPokeomon = jest.fn();
const mockStartSearchingPokemonByName = jest.fn();

jest.mock("../actions/pokemon", () => ({
  startChargingPokemons: () => mockStartChargingPokeomon,
  startSearchingPokemonsByName: (text: string) => {
    return () => mockStartSearchingPokemonByName(text);
  },
}));

const store = configureStore({
  reducer: {
    pokemons: pokemonReducer,
  },
});

describe("Slider Component", () => {
  beforeEach(() => jest.clearAllMocks());
  test("should search by name", () => {
    const { container: container1 } = render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    jest.useFakeTimers();
    const searchInput = screen.getByRole("textbox");

    fireEvent.change(searchInput, { target: { value: "test" } });
    jest.runAllTimers();
    expect(mockStartSearchingPokemonByName).toHaveBeenCalledWith("test");
    jest.clearAllMocks();

    fireEvent.change(searchInput, { target: { value: "" } });
    jest.runAllTimers();
    expect(mockStartChargingPokeomon).toHaveBeenCalled();
    expect(mockStartSearchingPokemonByName).not.toHaveBeenCalled();
  });
});
