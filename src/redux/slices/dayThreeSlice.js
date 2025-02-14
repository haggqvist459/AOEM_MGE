import { createSlice } from "@reduxjs/toolkit";
import { POINTS_AND_MULTIPLIERS, loadData, saveData, cleanNumericValue } from "../../utils";

const savedState = loadData();
const initialState = savedState?.dayThree || {
    marches: Array.from({ length: 5 }, () => ({
        gatherSpeed: '',
        loadCapacity: '',
        loadBonus: '',
    })),
    empireCoins: '',
    dailyScore: '',
    previousEventScore: {
        topOne: '',
        topTen: '',
    }
}

const dayThreeSlice = createSlice({
    name: 'dayThreeSlice',
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
        updateMarchField: (state, action) => {
            const {index, field, value} = action.payload;
            state.marches[index][field] = cleanNumericValue(value);
        },
        calculateDailyScore: (state) => {

        },
        resetState: (state) => {
            state.marches = Array.from({ length: 5 }, () => ({
                gatherSpeed: '',
                loadCapacity: '',
                loadBonus: '',
            })),
            state.empireCoins = '',
            state.dailyScore = '',
            state.previousEventScore = {
                topOne: '',
                topTen: '',
            };
            saveData({ ...loadData(), dayThree: { ...state } });
        }
    }
})

export const { updateField, calculateDailyScore, resetState, updateMarchField } = dayThreeSlice.actions;
export default dayThreeSlice.reducer;