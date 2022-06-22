import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../models/pokemon";

export interface PokemonsState {
  pokemons: Pokemon[];
  loaded: boolean;
  loading: boolean;
  currPokemon: Pokemon | null;
}

export const pokemonsInitialState: PokemonsState = {
  pokemons: [],
  loaded: false,
  loading: false,
  currPokemon: null,
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
      state.pokemons = [...pokemons];
    },
    setCurrPokemon: (state, { payload: pokemon }: PayloadAction<Pokemon>) => {
      state.currPokemon = pokemon;
    },
    removePokemon: (state, { payload: id }: PayloadAction<number>) => {
      state.pokemons = state.pokemons.filter((p) => p.id !== id);
    },
    addPokemon: (state, { payload: pokemon }: PayloadAction<Pokemon>) => {
      state.pokemons = [...state.pokemons, { ...pokemon }];
    },
    editPokemon: (state, { payload: pokemon }: PayloadAction<Pokemon>) => {
      state.pokemons = state.pokemons.map((p) => {
        if (p.id === pokemon.id) return { ...pokemon };
        return { ...p };
      });
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
} = pokemonReducer.actions;

export default pokemonReducer.reducer;
