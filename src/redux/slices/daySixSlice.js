import { createSlice } from "@reduxjs/toolkit";
// import { sharedReducers } from '../slices'

const initialState = {
    troopPower: {
        completedBatches: ''
    },
    researchPower: '',
    buildingPower: {
        firstQueue: '',
        secondQueue: '',
        thirdQueue: '',
    },
    dailyScore: 0,
    previousEventScore: {
        topOne: '',
        topTen: '',
    }
}


const daySixSlice = createSlice({
    name: 'daySixSlice',
    initialState,
    reducers: {
        updateField: (state, action) => updateField(state, action),
        updatePreviousEventScore: (state, action) => updatePreviousEventScore(state, action),
        calculateDailyScore: (state, action) => {

        },
        resetState: (state) => {

        }
    },
    // extraReducers: (builder) => {
    //     sharedReducers(builder);
    // }

})

export const { calculateDailyScore, resetState } = daySixSlice.actions;
export default daySixSlice.reducer;