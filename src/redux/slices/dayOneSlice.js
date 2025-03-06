import { createSlice } from "@reduxjs/toolkit";
import { TRIBE_LEVEL_MULTIPLIERS, POINTS_AND_MULTIPLIERS, loadData, saveData, updateFieldDelegated } from "../../utils";


const dropdownOptions = Object.keys(TRIBE_LEVEL_MULTIPLIERS)

//check localStorage
const savedState = loadData();
// if localStorage has data for day one, use that
// if not, initialise new object 
const initialState = savedState?.dayOne || {
    stamina: '',
    tribeLevelMultiplier: TRIBE_LEVEL_MULTIPLIERS[dropdownOptions[0]],
    totalDailyScore: 0,
    tribesHunted: 0,
    previousEventScore: {
        topOne: '',
        topTen: '',
    }
}

const dayOneSlice = createSlice({
    name: 'dayOneSlice',
    initialState,
    reducers: {
        updateField: (state, action) => updateFieldDelegated(state, action),
        calculateDailyScore: (state) => {
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
                topOne: '',
                topTen: '',
            };
            saveData({ ...loadData(), dayOne: { ...state } });
        },
    },
    // extraReducers: (builder) => {
    //     sharedReducers(builder, DAY_KEYS.DAY_ONE);    
    // }
})
export const { updateField, calculateDailyScore, resetState } = dayOneSlice.actions;
export default dayOneSlice.reducer;



