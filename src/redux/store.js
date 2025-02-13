import { configureStore } from "@reduxjs/toolkit";
import { dayOneReducer, dayTwoReducer, dayThreeReducer, dayFourReducer, dayFiveReducer, daySixReducer } from "./slices";
import { saveData } from "../utils";

const store = configureStore({
  reducer: {
    dayOne: dayOneReducer,
    dayTwo: dayTwoReducer,
    dayThree: dayThreeReducer,
    dayFour: dayFourReducer,
    dayFive: dayFiveReducer,
    daySix: daySixReducer,
  },
});

// store.subscribe(() => {
//     const state = store.getState();
//     saveData(state);
// })

export default store;