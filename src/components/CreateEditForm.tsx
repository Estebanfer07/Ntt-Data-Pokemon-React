import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useForm } from "../hooks/useForm";
import { RootState } from "../store/store";
import { Pokemon, pokTypes } from "../models/pokemon";
import { toggleForm } from "../reducers/pokemonReducer";
import { FormEvent, useEffect, useState } from "react";
import { Slider } from "./Slider";
import { startEdittingPokemon, startCreatingPokemon } from "../actions/pokemon";

export const CreateEditForm = () => {
  const requiredFields = ["name", "attack", "defense", "hp", "type", "image"];

  const pokemonsState = useAppSelector((state: RootState) => state.pokemons);
  const dispatch = useAppDispatch();

  const [invalidForm, setInvalidForm] = useState(true);

  const initialState = {
    name: "",
    attack: 50,
    defense: 50,
    hp: 0,
    image: "",
    type: "normal",
  };

  const [pokemonValues, handleInputChange, reset, validationValues]: any[] =
    useForm(initialState);

  useEffect(() => {
    setInvalidForm(
      Object.keys(validationValues)
        .filter((key) => requiredFields.includes(key))
        .map((key) => validationValues[key])
        .includes(false)
        ? true
        : false
    );
  }, [validationValues]);

  useEffect(() => {
    reset(pokemonsState.currPokemon ? pokemonsState.currPokemon : initialState);
  }, [pokemonsState.currPokemon]);

  const { name, image, type, attack, hp, defense, id } =
    pokemonValues as Pokemon;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (invalidForm) return;

    if (id) {
      dispatch(startEdittingPokemon(id, pokemonValues));
    } else {
      dispatch(startCreatingPokemon(pokemonValues));
    }
  };

  const cancel = () => {
    dispatch(toggleForm(false));
  };

  return (
    <div className="form_wrapper">
      <p>Nuevo Pokemon</p>
      <form onSubmit={handleSubmit}>
        <div className="form_row_wrapper">
          <div className="form_field_wrapper">
            <div className="input_description">Nombre:</div>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form_field_wrapper">
            <div className="input_description">Ataque:</div>
            <Slider
              controlName="attack"
              onChange={handleInputChange}
              value={attack}
            />
          </div>
        </div>
        <div className="form_row_wrapper">
          <div className="form_field_wrapper">
            <div className="input_description">Imagen:</div>
            <input
              type="text"
              name="image"
              placeholder="Url"
              value={image}
              onChange={handleInputChange}
            />
          </div>
          <div className="form_field_wrapper">
            <div className="input_description">Defensa:</div>
            <Slider
              controlName="defense"
              onChange={handleInputChange}
              value={defense}
            />
          </div>
        </div>
        <div className="form_row_wrapper">
          <div className="form_field_wrapper">
            <div className="input_description">Tipo:</div>
            <select name="type" onChange={handleInputChange} value={type}>
              {pokTypes.map((t) => (
                <option value={t} key={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="form_field_wrapper">
            <div className="input_description">Hp:</div>
            <Slider controlName="hp" onChange={handleInputChange} value={hp} />
          </div>
        </div>
        <div className="btns_wrapper">
          <button
            type="submit"
            className={`btn ${invalidForm ? "disabled" : ""}`}
          >
            <i className="far fa-save"></i> Guardar
          </button>
          <button type="button" className="btn" onClick={cancel}>
            <i className="fa fa-times"></i> Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
