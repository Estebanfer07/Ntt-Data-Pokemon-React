import { Pokemon } from "../models/pokemon";
import pokemonReducer, {
  pokemonsInitialState,
  PokemonsState,
  cargarPokemons,
  cargarPokemonsSuccess,
  filterPokemons,
  toggleForm,
  changePage,
  setCurrPokemon,
  removePokemon,
  addPokemon,
  editPokemon,
} from "./pokemonReducer";

const pokemons: Pokemon[] = [
  {
    id: 645,
    name: "Pikachu",
    image:
      "https://imagenpng.com/wp-content/uploads/2016/09/Pikachu-png-1-635x624.png",
    type: "fire",
    hp: 77,
    attack: 100,
    defense: 100,
    idAuthor: 1,
    created_at: new Date("2022-02-24T16:09:23.247Z"),
    updated_at: new Date("2022-03-05T22:55:29.095Z"),
  },
  {
    id: 668,
    name: "LUCARIO editado",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/448_f2.png",
    type: "poison",
    hp: 34,
    attack: 40,
    defense: 77,
    idAuthor: 1,
    created_at: new Date("2022-02-28T15:56:24.375Z"),
    updated_at: new Date("2022-03-06T03:38:48.230Z"),
  },
];

describe("pokemonReducer", () => {
  const initialState: PokemonsState = pokemonsInitialState;

  test("should handle initial state", () => {
    expect(pokemonReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  test("should change flag to show loading", () => {
    const state = pokemonReducer(initialState, cargarPokemons());
    expect(state.loading).toBeTruthy();
  });

  test("should change flag to show form", () => {
    expect(initialState.openForm).toBeFalsy();

    let state = pokemonReducer(initialState, toggleForm(true));
    expect(state.openForm).toBeTruthy();

    state = pokemonReducer(state, toggleForm(false));
    expect(state.openForm).toBeFalsy();
  });

  test("should update pokemons complete list", () => {
    const state = pokemonReducer(initialState, cargarPokemonsSuccess(pokemons));
    expect(state.completePokemons).toEqual(pokemons);
  });

  test("should filter pokemons by type", () => {
    let state = pokemonReducer(initialState, cargarPokemonsSuccess(pokemons));

    state = pokemonReducer(state, filterPokemons("normal"));
    expect(state.filteredPokemons.length).toBe(0);

    state = pokemonReducer(state, filterPokemons("fire"));
    expect(state.filteredPokemons.length).toBe(1);
  });

  test("should get pokemons for current page", () => {
    let state = pokemonReducer(
      { ...initialState, pokemonsPerPage: 1 },
      cargarPokemonsSuccess(pokemons)
    );

    state = pokemonReducer(state, changePage(1));
    expect(state.currPageList).toEqual([pokemons[0]]);

    state = pokemonReducer(state, changePage(2));
    expect(state.currPageList).toEqual([pokemons[1]]);
  });

  test("should set current pokemon", () => {
    const state = pokemonReducer(initialState, setCurrPokemon(pokemons[0]));
    expect(state.currPokemon).toEqual(pokemons[0]);
  });

  test("should add pokemon", () => {
    let state = pokemonReducer(initialState, cargarPokemonsSuccess(pokemons));
    expect(state.completePokemons.length).toEqual(pokemons.length);

    state = pokemonReducer(state, addPokemon(pokemons[0]));
    expect(state.completePokemons.length).toEqual(pokemons.length + 1);
  });

  test("should edit pokemon", () => {
    let state = pokemonReducer(initialState, cargarPokemonsSuccess(pokemons));

    state = pokemonReducer(
      state,
      editPokemon({ ...pokemons[0], name: "editado" })
    );
    expect(state.completePokemons[0].name).toBe("editado");
  });

  test("should remove pokemon", () => {
    let state = pokemonReducer(initialState, cargarPokemonsSuccess(pokemons));
    expect(state.completePokemons.length).toEqual(pokemons.length);

    state = pokemonReducer(state, removePokemon(pokemons[0].id));
    expect(state.completePokemons.length).toEqual(pokemons.length - 1);
  });
});
