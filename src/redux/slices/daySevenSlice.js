import { createSlice } from "@reduxjs/toolkit";
import { updateField, updatePreviousEventScore } from '../slices'

const initialState = {
    dailyScore: '',
    totalScore: '',
    previousEventScore: {
        topOne: '',
        topTen: '',
    }
}

const daySevenSlice = createSlice({
    name: 'daySevenSlice',
    initialState,
    reducers: {
        updateField: (state, action) => updateField(state, action),
        updatePreviousEventScore: (state, action) => updatePreviousEventScore(state, action),
        // updateField: (state, action) => {
        //     const { field, value } = action.payload;
        //     // Numeric value validation
        //     const cleanedValue = typeof value === 'string' ? value.replace(/[^0-9]/g, "") : value;
        //     const numericValue = Number(cleanedValue);

        //     // Update previous event scores if the field belongs there
        //     if (field in state.previousEventScore) {
        //         state.previousEventScore[field] = numericValue;
        //     } else {
        //         state[field] = numericValue;
        //     }
        // },
        calculateDailyScore: (state, action) => {

        },
        resetState: (state) => {

        }
    }
})

export const { calculateDailyScore, resetState } = daySevenSlice.actions;
export default daySevenSlice.reducer;