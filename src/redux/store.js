import { configureStore } from "@reduxjs/toolkit";
import { dayOneReducer, dayTwoReducer, dayThreeReducer, dayFourReducer, dayFiveReducer, daySixReducer, daySevenReducer } from "./slices";
import { DAY_KEYS, saveData } from "../utils";

const store = configureStore({
  reducer: {
    [DAY_KEYS.DAY_ONE]: dayOneReducer,
    [DAY_KEYS.DAY_TWO]: dayTwoReducer,
    [DAY_KEYS.DAY_THREE]: dayThreeReducer,
    [DAY_KEYS.DAY_FOUR]: dayFourReducer,
    [DAY_KEYS.DAY_FIVE]: dayFiveReducer,
    [DAY_KEYS.DAY_SIX]: daySixReducer,
    [DAY_KEYS.DAY_SEVEN]: daySevenReducer
  },
});


// save to localstorage only if state has changed, 
// check every second instead of every time state has changed 

let lastSavedState = store.getState();
setInterval(() => {
  const currentState = store.getState();

  if (JSON.stringify(currentState) !== JSON.stringify(lastSavedState)) {
    saveData(currentState);
    lastSavedState = currentState;
  }
}, 1000)


export default store;