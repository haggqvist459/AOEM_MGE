import { createSlice } from "@reduxjs/toolkit";
import { updateField, updatePreviousEventScore } from '../slices'

const initialState = {
    dailyScore: '',
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
    }
})

export const { calculateDailyScore, resetState } = daySixSlice.actions;
export default daySixSlice.reducer;