import { createSlice } from "@reduxjs/toolkit";
import { POINTS_AND_MULTIPLIERS, RESOURCE_MULTIPLIERS, loadData, saveData, validateInputForState, updateFieldDelegated } from "../../utils";

// import { sharedReducers } from '../slices'

const savedState = loadData();
const initialState = savedState?.dayThree || {
    marches: [
        {
            gatherSpeedBonus: '',
            loadCapacity: '',
            loadBonus: '',
            marchScore: 0,
            completedTurns: '',
            fullAtReset: false
        }
    ],
    empireCoins: '',
    totalDailyScore: 0,
    previousEventScore: {
        topOne: '',
        topTen: '',
    }
}

const dayThreeSlice = createSlice({
    name: 'dayThreeSlice',
    initialState,
    reducers: {
        updateField: (state, action) => updateFieldDelegated(state, action),
        updateMarchField: (state, action) => {
            const { index, field, value } = action.payload;

            console.log("updateMarchField action received:", action.payload);

            if (!state.marches[index]) {
                console.error(`Invalid march index: ${index}`);
                return;
            }

            if (!(field in state.marches[index])) {
                console.error(`Invalid field: ${field} for march at index ${index}`);
                return;
            }

            state.marches[index][field] = validateInputForState(value);
        },
        calculateDailyScore: (state) => {

        },
        resetState: (state) => {
            state.marches = [
                {
                    gatherSpeedBonus: '',
                    loadCapacity: '',
                    loadBonus: '',
                    marchScore: 0,
                    completedTurns: '',
                    fullAtReset: false
                }
            ];
            state.empireCoins = '';
            state.dailyScore = 0;
            state.previousEventScore = {
                topOne: '',
                topTen: '',
            };

            saveData({ ...loadData(), dayThree: { ...state } });
        }
    },
    // extraReducers: (builder) => {
    //     sharedReducers(builder);
    // }
})

export const { calculateDailyScore, resetState, updateMarchField, updateField } = dayThreeSlice.actions;
export default dayThreeSlice.reducer;