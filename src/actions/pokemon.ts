import axios from "axios";
import {
  cargarPokemons,
  cargarPokemonsSuccess,
  changePage,
} from "../reducers/pokemonReducer";
import { AppThunk } from "../store/store";
import { Pokemon } from "../models/pokemon";

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const startChargingPokemons =
  (): AppThunk => async (dispatch, getState) => {
    dispatch(cargarPokemons());
    try {
      const resp = await axios.get<Pokemon[]>(
        "https://bp-pokemons.herokuapp.com/?idAuthor=1"
      );
      const pokemons = resp.data;
      dispatch(cargarPokemonsSuccess(pokemons));
      dispatch(changePage(1));
    } catch (error) {
      dispatch(cargarPokemonsSuccess([]));
      window.alert("Hubo un problema al cargar Pokemons");
    }
  };
