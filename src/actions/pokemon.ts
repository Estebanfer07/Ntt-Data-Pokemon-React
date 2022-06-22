import axios from "axios";
import {
  addPokemon,
  cargarPokemons,
  cargarPokemonsSuccess,
  changePage,
  editPokemon,
  toggleForm,
} from "../reducers/pokemonReducer";
import { AppThunk } from "../store/store";
import { Pokemon } from "../models/pokemon";

export const startChargingPokemons =
  (): AppThunk => async (dispatch, getState) => {
    dispatch(cargarPokemons());
    try {
      const resp = await axios.get<Pokemon[]>(
        `${process.env.REACT_APP_BASE_URL}/?idAuthor=1`
      );
      const pokemons = resp.data;
      dispatch(cargarPokemonsSuccess(pokemons));
      dispatch(changePage(1));
    } catch (error) {
      dispatch(cargarPokemonsSuccess([]));
      window.alert("Hubo un problema al cargar Pokemons");
    }
  };

export const startSearchingPokemonsByName =
  (text: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(cargarPokemons());
    try {
      const resp = await axios.get<Pokemon[]>(
        `${process.env.REACT_APP_BASE_URL}/?idAuthor=1`
      );
      const pokemons = resp.data.filter((p) =>
        p.name.toLowerCase().includes(text.toLowerCase())
      );
      dispatch(cargarPokemonsSuccess(pokemons));
      dispatch(changePage(1));
    } catch (error) {
      dispatch(cargarPokemonsSuccess([]));
      window.alert("Hubo un problema al cargar Pokemons");
    }
  };

export const startEdittingPokemon =
  (id: number, data: Pokemon): AppThunk =>
  async (dispatch, getState) => {
    try {
      const resp = await axios.put<
        Pokemon | { data: string; success: boolean }
      >(`${process.env.REACT_APP_BASE_URL}/${id}`, { ...data, idAuthor: 1 });

      if ("success" in resp.data) {
        window.alert("Hubo un problema al editar Pokemon");
      } else {
        const pokemon = resp.data;
        dispatch(editPokemon(pokemon));
        dispatch(toggleForm(false));
        window.alert("Pokemon editado correctamente");
      }
    } catch (error) {
      dispatch(cargarPokemonsSuccess([]));
      window.alert("Hubo un problema al editar Pokemon");
    }
  };

export const startCreatingPokemon =
  (data: Pokemon): AppThunk =>
  async (dispatch, getState) => {
    try {
      const resp = await axios.post<
        Pokemon | { data: string; success: boolean }
      >(`${process.env.REACT_APP_BASE_URL}/?idAuthor=1 `, {
        ...data,
        idAuthor: 1,
      });

      if ("success" in resp.data) {
        window.alert("Hubo un problema al crear Pokemon");
      } else {
        const pokemon = resp.data;
        dispatch(addPokemon(pokemon));
        dispatch(toggleForm(false));
        window.alert("Pokemon creado correctamente");
      }
    } catch (error) {
      dispatch(cargarPokemonsSuccess([]));
      window.alert("Hubo un problema al crear Pokemon");
    }
  };
