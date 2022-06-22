import { incrementByAmount } from "../reducers/counterReducer";
import { AppThunk } from "../store/store";

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = getState().counter.value;
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };
