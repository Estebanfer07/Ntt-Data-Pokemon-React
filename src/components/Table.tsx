import { ChangeEvent, useEffect, useState } from "react";
import { startChargingPokemons } from "../actions/pokemon";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { PokemonType, Pokemon, pokTypes } from "../models/pokemon";
import { RootState } from "../store/store";

export const Table = () => {
  const pokemonTypes = ["todos", ...pokTypes];
  const pokemonsPerPage = 2;

  const dispatch = useAppDispatch();
  const pokemonsState = useAppSelector((state: RootState) => state.pokemons);

  const [loadingPokemons, setLoadingPokemons] = useState(false);
  const [loadedPokemons, setLoadedPokemons] = useState(false);
  const [currType, setCurrType] = useState<PokemonType | "todos">("todos");
  const [filteredPokList, setFilteredPokList] = useState<Pokemon[]>([]);
  const [pageList, setPageList] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    dispatch(startChargingPokemons());
  }, [dispatch]);

  useEffect(() => {
    setLoadingPokemons(pokemonsState.loading);
    setLoadedPokemons(pokemonsState.loaded);
  }, [pokemonsState]);

  const filterList = () => {
    if (currType === "todos") {
      setFilteredPokList([...pokemonsState.pokemons]);
    } else {
      setFilteredPokList(
        pokemonsState.pokemons.filter((p) => p.type === currType)
      );
    }
    goTopPage(1);
  };

  const handleTypeChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    setCurrType(target.value as PokemonType);
    filterList();
  };

  const nextPage = () => {
    if (currentPage * pokemonsPerPage >= filteredPokList.length) return;
    setCurrentPage(currentPage + 1);
    getCurrentPageList();
  };

  const lastPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
    getCurrentPageList();
  };
  const goTopPage = (page: number) => {
    setCurrentPage(page);
    getCurrentPageList();
  };

  const getCurrentPageList = () => {
    setPageList(
      filteredPokList.slice(
        currentPage * pokemonsPerPage - pokemonsPerPage,
        pokemonsPerPage * currentPage
      )
    );
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
      {loadingPokemons && <p>loading...</p>}

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
                currentPage * pokemonsPerPage >= filteredPokList.length
                  ? "disabled"
                  : ""
              }`}
              onClick={nextPage}
            ></i>
          </div>
        </div>
        {loadedPokemons && !loadingPokemons && (
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
              {pageList.map((p) => (
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
