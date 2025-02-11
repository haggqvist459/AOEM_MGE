import { createSlice } from "@reduxjs/toolkit";
import { TRIBE_LEVEL_MULTIPLIERS, POINTS_AND_MULTIPLIERS } from "../../utils";

// generate dropdown options 
const dropdownOptions = Object.keys(TRIBE_LEVEL_MULTIPLIERS)

const initialState = {
    stamina: '',
    tribeLevelMultiplier: TRIBE_LEVEL_MULTIPLIERS[dropdownOptions[dropdownOptions.length - 1]],
    staminaCost: POINTS_AND_MULTIPLIERS.STAMINA_PER_TRIBE,

    totalScore: '',
    tribesHunted: '',

    previousEventScore: {
        topOne: '',
        topTen: '',
    }
}
const dayOneSlice = createSlice({
    name: 'dayOne',
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
        }
    }
}); 

