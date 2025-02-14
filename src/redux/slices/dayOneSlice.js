import { createSlice } from "@reduxjs/toolkit";
import { TRIBE_LEVEL_MULTIPLIERS, POINTS_AND_MULTIPLIERS, loadData, saveData, cleanNumericValue } from "../../utils";

const dropdownOptions = Object.keys(TRIBE_LEVEL_MULTIPLIERS)

//check localStorage
const savedState = loadData();
// if localStorage has data for day one, use that
// if not, initialise new object 
const initialState = savedState?.dayOne || {
    stamina: '',
    tribeLevelMultiplier: TRIBE_LEVEL_MULTIPLIERS[dropdownOptions[dropdownOptions.length - 1]],
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

            // Update previous event scores if the field belongs there
            if (field in state.previousEventScore) {
                state.previousEventScore[field] = cleanNumericValue(value);
            } else {
                state[field] = cleanNumericValue(value);
            }
        },
        calculateDailyScore: (state) => {
            // validate stamina as a multiple of staminaCost 
            const validStamina = state.stamina - (state.stamina % POINTS_AND_MULTIPLIERS.STAMINA_PER_TRIBE)

            // calculate number of tribes that can be hunted based on stamina 
            state.tribesHunted = validStamina / POINTS_AND_MULTIPLIERS.STAMINA_PER_TRIBE
            // multiply that number with the tribe level multiplier
            state.dailyScore = state.tribesHunted * state.tribeLevelMultiplier
        },
        resetState: (state) => {
            state.stamina = '',
            state.tribeLevelMultiplier = TRIBE_LEVEL_MULTIPLIERS[dropdownOptions[dropdownOptions.length - 1]],
            state.dailyScore = '',
            state.tribesHunted = '',
            state.previousEventScore = {
                topOne: '',
                topTen: '',
            };

            saveData({...loadData(), dayOne: {... state }});
        }
    }
})

export const { updateField, calculateDailyScore, resetState } = dayOneSlice.actions;
export default dayOneSlice.reducer;
