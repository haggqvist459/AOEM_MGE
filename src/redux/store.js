import { configureStore } from "@reduxjs/toolkit";
import { dayOneReducer, dayTwoReducer, dayThreeReducer, dayFourReducer, dayFiveReducer, daySixReducer, daySevenReducer } from "./slices";
import { saveData } from "../utils";

const store = configureStore({
  reducer: {
    dayOne: dayOneReducer,
    dayTwo: dayTwoReducer,
    dayThree: dayThreeReducer,
    dayFour: dayFourReducer,
    dayFive: dayFiveReducer,
    daySix: daySixReducer,
    daySeven: daySevenReducer
  },
});


// save to localstorage only if state has changed, 
// check every two seconds instead of every time state has changed 

let lastSavedState = store.getState();
setInterval(() => {
    const currentState = store.getState();

    if (JSON.stringify(currentState) !== JSON.stringify(lastSavedState)) {
        saveData(currentState);
        lastSavedState = currentState;
    }
}, 2000)


export default store;