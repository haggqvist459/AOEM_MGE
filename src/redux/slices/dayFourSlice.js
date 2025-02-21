import { createSlice } from "@reduxjs/toolkit";
import { POINTS_AND_MULTIPLIERS, loadData, saveData, cleanNumericValue } from "../../utils";
import { updateField, updatePreviousEventScore } from '../slices'

const initialState = {
    hammers: '',
    copperSand: '',
    silverSand: '',
    fineGold: '',
    meteorSteel: '',
    universalSpeedup: '',
    researchSpeedup: '',
    buildingSpeedup: '',
    totalDailyScore: '',
    previousEventScore: {
        topOne: '',
        topTen: '',
    }
}

const dayFourSlice = createSlice({
    name: 'dayFourSlice',
    initialState,
    reducers: {
        updateField: (state, action) => updateField(state, action),
        updatePreviousEventScore: (state, action) => updatePreviousEventScore(state, action),
        updateField: (state, action) => {
            const { field, value } = action.payload;

            // Update previous event scores if the field belongs there
            if (field in state.previousEventScore) {
                state.previousEventScore[field] = cleanNumericValue(value);
            } else {
                state[field] = cleanNumericValue(value);
            }
        },
        calculateDailyScore: (state) => {

        },
        resetState: (state) => {

        }
    }
})

export const { calculateDailyScore, resetState } = dayFourSlice.actions;
export default dayFourSlice.reducer;