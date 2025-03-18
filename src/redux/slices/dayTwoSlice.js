import { createSlice } from "@reduxjs/toolkit";
import { loadData, saveData, POINTS_AND_MULTIPLIERS, updateFieldDelegated, calculateForgingScore, convertToSeconds } from "../../utils";

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
        calculateDailyScore: (state, action) => {
            const { field, unit } = action.payload;

            console.log("dayTwo calculateDailyScore action.payload, field: ", field, ', unit: ', unit)

            switch (field) {
                case 'epicMedals':
                case 'legendaryMedals':
                    state.score.medals = 0; // Reset before adding values
                    if (state.epicMedals !== '' || state.epicMedals <= 0) {
                        state.score.medals += state.epicMedals * POINTS_AND_MULTIPLIERS.EPIC_MEDAL;
                    }
                    if (state.legendaryMedals !== '' || state.legendaryMedals <= 0) {
                        state.score.medals += state.legendaryMedals * POINTS_AND_MULTIPLIERS.LEGENDARY_MEDAL;
                    }
                    break;
                case 'epicScrolls':
                case 'legendaryScrolls':
                    state.score.scrolls = 0; // Reset before adding values
                    if (state.epicScrolls !== '' || state.epicScrolls <= 0) {
                        state.score.scrolls += state.epicScrolls * POINTS_AND_MULTIPLIERS.EPIC_SCROLL;
                    }
                    if (state.legendaryScrolls !== '' || state.legendaryScrolls <= 0) {
                        state.score.scrolls += state.legendaryScrolls * POINTS_AND_MULTIPLIERS.LEGENDARY_SCROLL;
                    }
                    break;
                case 'hammers':
                case 'copperSand':
                case 'silverSand':
                case 'fineGold':
                    state.score.rings = 0;
                    if (state.hammers !== '' || state.hammers <= 0) {
                        state.score.rings += state.hammers * POINTS_AND_MULTIPLIERS.FINE_CRAFT;
                    }
                    if (state.copperSand !== '' || state.copperSand <= 0) {
                        state.score.rings += state.copperSand * POINTS_AND_MULTIPLIERS.COPPER_SAND;
                    }
                    if (state.silverSand !== '' || state.silverSand <= 0) {
                        state.score.rings += state.silverSand * POINTS_AND_MULTIPLIERS.SILVER_SAND;
                    }
                    if (state.fineGold !== '' || state.fineGold <= 0) {
                        state.score.rings += state.fineGold * POINTS_AND_MULTIPLIERS.FINE_GOLD;
                    }
                    break;
                case 'legendaryBlueprints':
                case 'preforgedBlueprints':
                case 'forgingTime':
                    state.score.forging = 0;
                    if(state.preforgedBlueprints > 0){
                        if (state.preforgedBlueprints > 5) {
                            state.preforgedBlueprints = 5; // Maximum of 5 queues available
                        }
                        state.score.forging = state.preforgedBlueprints * POINTS_AND_MULTIPLIERS.LEGENDARY_BLUEPRINT; 
                    }
                    const forgingSpeedupSeconds = convertToSeconds(state.forgingSpeedup);
                    const forgingTimeSeconds = convertToSeconds(state.forgingTime);

                    if(unit && state.legendaryBlueprints > 0 && forgingTimeSeconds > 0 && forgingSpeedupSeconds > forgingTimeSeconds) {
                        const forgingResult = calculateForgingScore(state.legendaryBlueprints, POINTS_AND_MULTIPLIERS.LEGENDARY_BLUEPRINT, forgingTimeSeconds, forgingSpeedupSeconds);
                        state.score.forging += forgingResult.score;
                        state.remainingBlueprints = forgingResult.remainingBlueprints;
                        state.completedBlueprints = forgingResult.completedBlueprints;
                        state.remainingForgingSpeedup = forgingResult.remainingSpeedup
                    }

            }

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
