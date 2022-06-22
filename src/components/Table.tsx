import { ChangeEvent, useEffect, useState } from "react";
import { startChargingPokemons } from "../actions/pokemon";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { PokemonType, Pokemon, pokTypes } from "../models/pokemon";
import { changePage, filterPokemons } from "../reducers/pokemonReducer";
import { RootState } from "../store/store";

export const Table = () => {
  const pokemonTypes = ["todos", ...pokTypes];

  const dispatch = useAppDispatch();
  const pokemonsState = useAppSelector((state: RootState) => state.pokemons);

  const [currType, setCurrType] = useState<PokemonType | "todos">("todos");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    dispatch(startChargingPokemons());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterPokemons(currType));
    dispatch(changePage(1));
    setCurrentPage(1);
  }, [currType, dispatch]);

  const handleTypeChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    setCurrType(target.value as PokemonType);
  };

  const nextPage = () => {
    if (
      currentPage * pokemonsState.pokemonsPerPage >=
      pokemonsState.filteredPokemons.length
    )
      return;
    dispatch(changePage(currentPage + 1));
    setCurrentPage(currentPage + 1);
  };

  const lastPage = () => {
    if (currentPage === 1) return;
    dispatch(changePage(currentPage - 1));
    setCurrentPage(currentPage - 1);
  };

  const edit = (pokemon: Pokemon) => {
    // editPokemon.emit(pokemon);
  };

  const remove = (pokemon: Pokemon) => {
    const confirmar = window.confirm("seguro que desea eliminar?");

    if (confirmar) {
      //   pokemonService.removePokemon(pokemon.id).subscribe({
      //     next: (p) => {
      //       store.dispatch(removePokemon({ id: p.id }));
      //     },
      //     error: (_) => alert('Hubo un error al eliminar Pokemon'),
      //   });

      alert("Pokemon eliminado correctamemte");
    }
  };

  return (
    <>
      {pokemonsState.loading && <p>loading...</p>}

      <div className="table_wrapper">
        <div className="table_options_wrapper">
          <select
            name="type"
            onChange={(e) => handleTypeChange(e)}
            value={currType}
          >
            {pokemonTypes.map((t) => (
              <option value={t} key={t}>
                {t}
              </option>
            ))}
          </select>
          <div className="paginator">
            <i
              className={`fas fa-angle-left ${
                currentPage === 1 ? "disabled" : ""
              }`}
              onClick={lastPage}
            ></i>
            <span>{currentPage}</span>
            <i
              className={`fas fa-angle-right ${
                currentPage * pokemonsState.pokemonsPerPage >=
                pokemonsState.filteredPokemons.length
                  ? "disabled"
                  : ""
              }`}
              onClick={nextPage}
            ></i>
          </div>
        </div>
        {pokemonsState.loaded && !pokemonsState.loading && (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Imagen</th>
                <th>Ataque</th>
                <th>Defensa</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pokemonsState.currPageList.map((p) => (
                <tr key={p.id}>
                  <td>{p.name || "No hay nombre"}</td>
                  <td>
                    <img
                      src={
                        p.image && p.image.length > 0
                          ? p.image
                          : "https://www.audicomer.com.ec/wp-content/themes/consultix/images/no-image-found-360x260.png"
                      }
                      alt={p.name}
                      className="table_image"
                    />
                  </td>
                  <td>{p.attack}</td>
                  <td>{p.defense}</td>
                  <td>
                    <i className="fas fa-edit" onClick={() => edit(p)}></i>
                    <i className="fas fa-trash" onClick={() => remove(p)}></i>
                    <br />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
