import { createSlice } from "@reduxjs/toolkit";
import { loadData, saveData, POINTS_AND_MULTIPLIERS, updateFieldDelegated, calculateForgingScore } from "../../utils";

const savedState = loadData();
const initialState = savedState?.dayTwo || {
    epicMedals: '',
    legendaryMedals: '',
    epicScrolls: '',
    legendaryScrolls: '',
    legendaryBlueprints: '',
    preforgedBlueprints: '',
    remainingBlueprints: 0,
    completedBlueprints: 0,
    forgingTime: {
        days: '',
        hours: '',
        minutes: '',
        seconds: '',
    },
    forgingSpeedup: {
        days: '',
        hours: '',
        minutes: '',
        seconds: '',
    },
    remainingForgingSpeedup: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    },
    score: {
        medals: 0,
        scrolls: 0,
        forging: 0,
    },
    totalDailyScore: 0,
    previousEventScore: {
        topOne: '',
        topTen: '',
    }
}

const dayTwoSlice = createSlice({
    name: 'dayTwoSlice',
    initialState,
    reducers: {
        updateField: (state, action) => updateFieldDelegated(state, action),
        calculateDailyScore: (state) => {

            // calculate the medal and scroll scores, assign to state
            state.score.medals = (state.epicMedals * POINTS_AND_MULTIPLIERS.EPIC_MEDAL) + (state.legendaryMedals * POINTS_AND_MULTIPLIERS.LEGENDARY_MEDAL);
            console.log('dayTwoSlice calculateDailyScore medalScore: ', state.score.medals);
            state.score.scrolls = (state.epicScrolls * POINTS_AND_MULTIPLIERS.EPIC_SCROLL) + (state.legendaryScrolls * POINTS_AND_MULTIPLIERS.LEGENDARY_SCROLL);
            console.log('dayTwoSlice calculateDailyScore scrollScore', state.score.scrolls);

            // calculate the forging score
            const forgingResult = calculateForgingScore(state.legendaryBlueprints, POINTS_AND_MULTIPLIERS.LEGENDARY_BLUEPRINT, state.forgingTime, state.forgingSpeedup);
            state.score.forging = forgingResult.score + (state.preforgedBlueprints * POINTS_AND_MULTIPLIERS.LEGENDARY_BLUEPRINT);
            state.remainingBlueprints = forgingResult.remainingBlueprints;
            state.completedBlueprints = forgingResult.completedBlueprints;
            state.remainingForgingSpeedup = forgingResult.remainingSpeedup;

            //then calculate the total daily score
            state.totalDailyScore = state.score.medals + state.score.scrolls + state.score.forging
        },
        resetState: (state) => {
            state.epicMedals = '';
            state.legendaryMedals = '';
            state.epicScrolls = '';
            state.legendaryScrolls = '';
            state.legendaryBlueprints = '';
            state.preforgedBlueprints = '';
            state.remainingBlueprints = 0;
            state.completedBlueprints = 0;
            state.forgingTime = {
                days: '',
                hours: '',
                minutes: '',
                seconds: '',
            };
            state.forgingSpeedup = {
                days: '',
                hours: '',
                minutes: '',
                seconds: '',
            };
            state.remainingForgingSpeedup = {
                days: '',
                hours: '',
                minutes: '',
                seconds: '',
            };
            state.score = {
                medals: 0,
                scrolls: 0,
                forging: 0,
            };
            state.totalDailyScore = 0;
            state.previousEventScore = {
                topOne: '',
                topTen: '',
            };

            saveData({ ...loadData(), dayTwo: { ...state } });
        }
    },
})

export const { calculateDailyScore, resetState, updateField } = dayTwoSlice.actions;
export default dayTwoSlice.reducer;
