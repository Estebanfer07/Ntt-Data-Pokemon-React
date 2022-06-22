import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import pokemonReducer from "../reducers/pokemonReducer";

export const store = configureStore({
  reducer: {
    pokemons: pokemonReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
