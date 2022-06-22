import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon, PokemonType } from "../models/pokemon";

export interface PokemonsState {
  completePokemons: Pokemon[];
  filteredPokemons: Pokemon[];
  currPageList: Pokemon[];
  loaded: boolean;
  loading: boolean;
  openForm: boolean;
  currPokemon: Pokemon | null;
  pokemonsPerPage: number;
}

export const pokemonsInitialState: PokemonsState = {
  completePokemons: [],
  filteredPokemons: [],
  currPageList: [],
  loaded: false,
  loading: false,
  openForm: false,
  currPokemon: null,
  pokemonsPerPage: 5,
};

export const pokemonReducer = createSlice({
  name: "counter",
  initialState: pokemonsInitialState,
  reducers: {
    cargarPokemons: (state) => {
      state.loading = true;
    },
    cargarPokemonsSuccess: (
      state,
      { payload: pokemons }: PayloadAction<Pokemon[]>
    ) => {
      state.loading = false;
      state.loaded = true;
      state.completePokemons = [...pokemons];
      state.filteredPokemons = [...pokemons];
    },
    setCurrPokemon: (
      state,
      { payload: pokemon }: PayloadAction<Pokemon | null>
    ) => {
      state.currPokemon = pokemon;
    },
    removePokemon: (state, { payload: id }: PayloadAction<number>) => {
      state.completePokemons = state.completePokemons.filter(
        (p) => p.id !== id
      );
    },
    addPokemon: (state, { payload: pokemon }: PayloadAction<Pokemon>) => {
      state.completePokemons = [...state.completePokemons, { ...pokemon }];
    },
    editPokemon: (state, { payload: pokemon }: PayloadAction<Pokemon>) => {
      state.completePokemons = state.completePokemons.map((p) => {
        if (p.id === pokemon.id) return { ...pokemon };
        return { ...p };
      });
    },
    changePage: (state, { payload: page }: PayloadAction<number>) => {
      state.currPageList = state.filteredPokemons.slice(
        page * state.pokemonsPerPage - state.pokemonsPerPage,
        state.pokemonsPerPage * page
      );
    },
    filterPokemons: (
      state,
      { payload: currType }: PayloadAction<PokemonType | "todos">
    ) => {
      if (currType === "todos") {
        state.filteredPokemons = [...state.completePokemons];
      } else {
        state.filteredPokemons = state.completePokemons.filter(
          (p) => p.type === currType
        );
      }
    },
    toggleForm: (state, { payload: openForm }: PayloadAction<boolean>) => {
      state.openForm = openForm;
    },
  },
});

export const {
  cargarPokemons,
  cargarPokemonsSuccess,
  setCurrPokemon,
  removePokemon,
  addPokemon,
  editPokemon,
  changePage,
  filterPokemons,
  toggleForm,
} = pokemonReducer.actions;

export default pokemonReducer.reducer;
