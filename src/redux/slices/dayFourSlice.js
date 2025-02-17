import { createSlice } from "@reduxjs/toolkit";
import { POINTS_AND_MULTIPLIERS, loadData, saveData, cleanNumericValue } from "../../utils";

const initialState = {
    hammers: '',
    copperSand: '',
    silverSand: '',
    fineGold: '',
    meteorSteel: '',
    universalSpeedup: '',
    researchSpeedup: '',
    buildingSpeedup: '',
    dailyScore: '',
    previousEventScore: {
        topOne: '',
        topTen: '',
    }
}

const dayFourSlice = createSlice({
    name: 'dayFourSlice',
    initialState,
    reducers: {
        updateField: (state, action) => {
            const { field, value } = action.payload;
            // Numeric value validation
            const cleanedValue = typeof value === 'string' ? value.replace(/[^0-9]/g, "") : value;
            const numericValue = Number(cleanedValue);

            // Update previous event scores if the field belongs there
            if (field in state.previousEventScore) {
                state.previousEventScore[field] = numericValue;
            } else {
                state[field] = numericValue;
            }
        },
        calculateDailyScore: (state, action) => {

        },
        resetState: (state) => {

        }
    }
})

export const { updateField, calculateDailyScore, resetState } = dayFourSlice.actions;
export default dayFourSlice.reducer;