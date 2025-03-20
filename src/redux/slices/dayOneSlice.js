import { createSlice } from "@reduxjs/toolkit";
import { DAY_KEYS, TRIBE_LEVEL_MULTIPLIERS, POINTS_AND_MULTIPLIERS, loadData, saveData, updateFieldDelegated } from "../../utils";


const dropdownOptions = Object.keys(TRIBE_LEVEL_MULTIPLIERS)

//check localStorage
const savedState = loadData();
// if localStorage has data for day one, use that
// if not, initialise new object 
const initialState = savedState?.[DAY_KEYS.DAY_ONE] || {
    stamina: '',
    tribeLevelMultiplier: TRIBE_LEVEL_MULTIPLIERS[dropdownOptions[0]],
    tribesHunted: 0,
    totalDailyScore: 0,
    previousEventScore: {
        first: '',
        tenth: '',
    }
}

const dayOneSlice = createSlice({
    name: DAY_KEYS.DAY_ONE,
    initialState,
    reducers: {
        updateField: (state, action) => updateFieldDelegated(state, action),
        calculateDailyScore: (state) => {
            
            if (state.stamina === '' || state.stamina <= 0) {
                return; // Skip score calculation for empty or negative stamina values
            }
            // validate stamina as a multiple of staminaCost 
            const validStamina = state.stamina - (state.stamina % POINTS_AND_MULTIPLIERS.STAMINA_PER_TRIBE)

            // calculate number of tribes that can be hunted based on stamina 
            state.tribesHunted = validStamina / POINTS_AND_MULTIPLIERS.STAMINA_PER_TRIBE
            // multiply that number with the tribe level multiplier
            state.totalDailyScore = state.tribesHunted * state.tribeLevelMultiplier
        },
        resetState: (state) => {
            state.stamina = '';
            state.tribeLevelMultiplier = TRIBE_LEVEL_MULTIPLIERS[dropdownOptions[0]];
            state.totalDailyScore = 0;
            state.tribesHunted = 0;
            state.previousEventScore = {
                first: '',
                tenth: '',
            };
            saveData({ ...loadData(), [DAY_KEYS.DAY_ONE]: { ...state } });
        },
    },
})
export const { updateField, calculateDailyScore, resetState } = dayOneSlice.actions;
export default dayOneSlice.reducer;



