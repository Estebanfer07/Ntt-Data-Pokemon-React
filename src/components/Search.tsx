import React, { ChangeEvent } from "react";
import {
  startChargingPokemons,
  startSearchingPokemonsByName,
} from "../actions/pokemon";
import { useAppDispatch } from "../hooks/reduxHooks";

export const Search = () => {
  const dispatch = useAppDispatch();

  let timeoutId: NodeJS.Timeout;
  //debouncer
  const inputListener = ({ target }: ChangeEvent<HTMLInputElement>) => {
    // terminar ejecución de timeout angterior
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => searchPokemon(target.value), 500);
  };

  const searchPokemon = (searchTerm: string) => {
    if (!searchTerm || searchTerm.length == 0) {
      dispatch(startChargingPokemons());
    } else {
      dispatch(startSearchingPokemonsByName(searchTerm));
    }
  };

  return (
    <div className="search_input_wrapper">
      <i className="fas fa-search"></i>
      <input type="text" placeholder="Buscar" onChange={inputListener} />
    </div>
  );
};
