import { createSlice } from "@reduxjs/toolkit";

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
        updateField: (state, action) => {
            const { day, field, value } = action.payload;
            // Numeric value validation
            const cleanedValue = typeof value === 'string' ? value.replace(/[^0-9]/g, "") : value;
            const numericValue = Number(cleanedValue);
            // Update previous event scores if the field belongs there
            if (field in state[day].previousEventScore) {
                state.previousEventScore[field] = numericValue;
            } else {
                state[field] = numericValue;
            }
        },
        calculateDailyScore: (state, action) => {

        }
    }
})

export const { updateField, calculateDailyScore } = daySevenSlice.actions;
export default daySevenSlice.reducer;