import { createSlice } from "@reduxjs/toolkit";
import { loadData, saveData, POINTS_AND_MULTIPLIERS } from "../../utils";
// import { sharedReducers } from '../slices'

const savedState = loadData();
const initialState = savedState?.dayTwo || {
    epicMedals: '',
    legendaryMedals: '',
    epicScrolls: '',
    legendaryScrolls: '',
    legendaryBlueprints: '',
    forgingTime: '',
    forgingSpeedup: {
        days: '',
        hours: '',
        minutes: ''
    },
    score: {
        medals: 0,
        scrolls: 0,
        forging: 0,
    },
    totalDailyScore: '',
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

            // Update previous event scores if the field belongs there
            if (field in state.previousEventScore) {
                state.previousEventScore[field] = cleanNumericValue(value);
            } else {
                state[field] = cleanNumericValue(value);
            }
        },
        calculateDailyScore: (state) => {

            state.score.medals = (state.epicMedals * POINTS_AND_MULTIPLIERS.EPIC_MEDAL) + (state.legendaryMedals * POINTS_AND_MULTIPLIERS.LEGENDARY_MEDAL)
            console.log('dayTwoSlice calculateDailyScore medalScore: ', state.score.medals)
            state.score.scrolls = (state.epicScrolls * POINTS_AND_MULTIPLIERS.EPIC_SCROLL) + (state.legendaryScrolls * POINTS_AND_MULTIPLIERS.LEGENDARY_SCROLL)
            console.log('dayTwoSlice calculateDailyScore scrollScore', state.score.scrolls)

        },
        resetState: (state) => {
            state.epicMedals = '',
                state.legendaryMedals = '',
                state.epicScrolls = '',
                state.legendaryScrolls = '',
                state.legendaryBlueprints = '',
                state.speedUpForge = '',
                state.forgingTime = '',
                state.dailyScore = '',
                state.previousEventScore = {
                    topOne: '',
                    topTen: '',
                }

            saveData({ ...loadData(), dayTwo: { ...state } });
        }
    },
    // extraReducers: (builder) => {
    //     sharedReducers(builder);    
    // }
})

export const { calculateDailyScore, resetState } = dayTwoSlice.actions;
export default dayTwoSlice.reducer;
