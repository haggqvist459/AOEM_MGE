import { createSlice } from "@reduxjs/toolkit";
import { loadData, saveData, POINTS_AND_MULTIPLIERS } from "../../utils";

const savedState = loadData();

const initialState = savedState?.dayTwo || {
    epicMedals: '',
    legendaryMedals: '',
    epicScrolls: '',
    legendaryScrolls: '',
    legendaryBlueprints: '',
    speedUpForge: '',
    forgingTime: '',
    legendaryGearMultiplier: POINTS_AND_MULTIPLIERS.LEGENDARY_GEAR,
    epicMedalMultiplier: POINTS_AND_MULTIPLIERS.EPIC_MEDAL,
    legendaryMedalMultiplier: POINTS_AND_MULTIPLIERS.LEGENDARY_MEDAL,
    epicScrollMultiplier: POINTS_AND_MULTIPLIERS.EPIC_SCROLL,
    legendaryScrollMultiplier: POINTS_AND_MULTIPLIERS.LEGENDARY_SCROLL,
    dailyScore: '',
    previousEventScore: {
        topOne: '',
        topTen: '',
    }
}

const dayTwoSlice = createSlice({
    name: 'dayTwoSlice',
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

export const { updateField, calculateDailyScore, resetState } = dayTwoSlice.actions;
export default dayTwoSlice.reducer;
