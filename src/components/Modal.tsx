import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../store/store";
export const Modal = () => {
  const dispatch = useAppDispatch();
  const { currPokemon } = useAppSelector((state: RootState) => state.pokemons);

  return (
    <div className="modal_wrapper">
      <div className="modal">
        <img src={currPokemon?.image} alt="" />
        <div>{currPokemon?.name}</div>
      </div>
    </div>
  );
};
