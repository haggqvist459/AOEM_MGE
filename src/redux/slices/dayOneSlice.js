import { createSlice } from "@reduxjs/toolkit";
import { TRIBE_LEVEL_MULTIPLIERS, POINTS_AND_MULTIPLIERS, loadData } from "../../utils";

const dropdownOptions = Object.keys(TRIBE_LEVEL_MULTIPLIERS)

//check localStorage
const savedState = loadData();
// if localStorage has data for day one, use that
// if not, initialise new object 
const initialState = savedState?.dayOne || {
    stamina: '',
    tribeLevelMultiplier: TRIBE_LEVEL_MULTIPLIERS[dropdownOptions[dropdownOptions.length - 1]],
    staminaCost: POINTS_AND_MULTIPLIERS.STAMINA_PER_TRIBE,
    dailyScore: '',
    tribesHunted: '',
    previousEventScore: {
        topOne: '',
        topTen: '',
    }
}

const dayOneSlice = createSlice({
    name: 'dayOneSlice',
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
            // validate stamina as a multiple of staminaCost 
            const validStamina = state.stamina - (state.stamina % state.staminaCost)

            // calculate number of tribes that can be hunted based on stamina 
            state.tribesHunted = validStamina / state.staminaCost
            // multiply that number with the tribe level multiplier
            state.dailyScore = state.tribesHunted * state.tribeLevelMultiplier
        }
    }
})

export const { updateField, calculateDailyScore } = dayOneSlice.actions;
export default dayOneSlice.reducer;
