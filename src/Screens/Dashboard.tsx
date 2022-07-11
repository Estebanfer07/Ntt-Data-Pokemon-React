import { CreateEditForm } from "../components/CreateEditForm";
import { Modal } from "../components/Modal";
import { Search } from "../components/Search";
import { Table } from "../components/Table";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { setCurrPokemon, toggleForm } from "../reducers/pokemonReducer";
import { RootState } from "../store/store";

export const Dashboard = () => {
  const pokemonsState = useAppSelector((state: RootState) => state.pokemons);
  const dispatch = useAppDispatch();

  const showPokemonForm = () => {
    dispatch(setCurrPokemon(null));
    dispatch(toggleForm(true));
  };

  return (
    <div className="app-wrapper">
      <p>Listado de Pokemon</p>
      <div className="search_new_wrapper">
        <Search />
        <button className="btn" onClick={showPokemonForm}>
          <i className="fas fa-plus"></i>
          Nuevo
        </button>
      </div>
      <Table />
      {pokemonsState.openForm && <CreateEditForm />}
      {pokemonsState.openModal && <Modal />}
    </div>
  );
};
