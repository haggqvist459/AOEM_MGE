import { createSlice } from "@reduxjs/toolkit";
import {
    DAY_KEYS, POINTS_AND_MULTIPLIERS, RESOURCE_FIELD_MAP,
    loadData, saveData, validateInputForState, updateFieldDelegated,
    calculateGatheringScore
} from "../../utils";

const savedState = loadData();
const initialState = savedState?.[DAY_KEYS.DAY_THREE] || {
    marches: [
        {
            id: 1,
            marchName: 'March 1',
            loadBonus: '',
            completedTurns: '',
            loadCapacity: '',
            fullAtReset: false,
            score: 0,
        }
    ],
    nextMarchId: 2,
    richField: '0',
    allianceCentre: '0',
    empireCoins: '',
    score: {
        gathering: 0,
        spins: 0
    },
    totalDailyScore: 0,
    previousEventScore: {
        first: '',
        tenth: '',
    }
}

const dayThreeSlice = createSlice({
    name: DAY_KEYS.DAY_THREE,
    initialState,
    reducers: {
        updateField: (state, action) => updateFieldDelegated(state, action),
        updateMarchField: (state, action) => {
            const { id, field, value } = action.payload;

            // console.log("updateMarchField payload received:", action.payload);

            const marchIndex = state.marches.findIndex(march => march.id === id);
            if (marchIndex === -1) {
                console.error(`Invalid march ID: ${id}`);
                return;
            }

            if (!(field in state.marches[marchIndex])) {
                console.error(`Invalid field: ${field} for march with ID ${id}`);
                return;
            }

            const containsCharacters = /[a-zA-Z$%&!*()_+\-=\[\]{};':"\\|,.<>\/?`~\s]/.test(value);

            if (containsCharacters) {
                // console.log("The value contains characters or special symbols.");
                state.marches[marchIndex][field] = value
            } else {
                state.marches[marchIndex][field] = validateInputForState(value);
            }
        },
        removeMarch: (state, action) => {
            const { id } = action.payload;
            // console.log("removeMarch reducer with ID: ", id);
            state.marches = state.marches.filter(march => march.id !== id);
        },
        addMarch: (state) => {
            if (state.marches.length >= 5) return; // Ensure max limit of 5 marches

            const newMarch = {
                id: state.nextMarchId,
                marchName: `March ${state.nextMarchId}`,
                loadBonus: '',
                completedTurns: '',
                loadCapacity: '',
                fullAtReset: false,
                score: 0,
            };

            state.marches.push(newMarch);
            state.nextMarchId += 1;
        },
        calculateDailyScore: (state, action) => {
            const { id } = action.payload;
            // console.log("calculateDailyScoreDayThree triggered for ID:", id);
            const marchIndex = state.marches.findIndex(march => march.id === id);
            if (id === 0) {
                // console.log("Default value selected in dropdown. No score calculation necessary");
                return;
            }
            if (id === 999) {
                // calculate empire coins score, add to daily score
                state.score.spins = 0;
                const fiveSpinCount = Math.floor(state.empireCoins / POINTS_AND_MULTIPLIERS.FIVE_SPIN_COST);
                const remainingCoins = state.empireCoins % POINTS_AND_MULTIPLIERS.FIVE_SPIN_COST;
                const singleSpinCount = Math.floor(remainingCoins / POINTS_AND_MULTIPLIERS.SINGLE_SPIN_COST);

                state.score.spins = (fiveSpinCount * POINTS_AND_MULTIPLIERS.ADVENT_SCORE * 5) + (singleSpinCount * POINTS_AND_MULTIPLIERS.ADVENT_SCORE);
                state.totalDailyScore = state.score.spins + state.score.gathering

                // do not calculate march score 
                return;
            }
            if (marchIndex === -1) {
                console.error(`Invalid march ID: ${id}`);
                return;
            }


            const march = state.marches[marchIndex];

            // Ensure necessary values exist before calculations
            if (!march.loadCapacity || !march.completedTurns) {
                console.warn(`Missing values for march ${id}. Skipping score calculation.`);
                return;
            }

            // Reset score to 0,
            state.marches[marchIndex].score = 0;

            // Check if the march is selected for a special field
            if (state.richField === id) {
                // console.log("Rich field calculation triggered")
                calculateGatheringScore(march, RESOURCE_FIELD_MAP.RICH);
            } else if (state.allianceCentre === id) {
                // console.log("alliance centre calculation triggered. ")
                calculateGatheringScore(march, RESOURCE_FIELD_MAP.ALLIANCE);
            } else {
                // console.log("Regular field calculation triggered.");
                calculateGatheringScore(march, RESOURCE_FIELD_MAP.REGULAR);
            }

            // Score assignment, to score.gathering and totalDailyScore
            // Recalculate gathering score by summing up all marches' scores
            state.score.gathering = state.marches.reduce((total, march) => total + march.score, 0);

            // Update totalDailyScore to reflect both gathering and spins scores
            state.totalDailyScore = state.score.gathering + state.score.spins;

        },
        resetState: (state) => {
            state.marches = [
                {
                    id: 1,
                    marchName: 'March 1',
                    loadBonus: '',
                    completedTurns: '',
                    loadCapacity: '',
                    fullAtReset: false,
                    score: 0,
                }
            ];
            state.nextMarchId = 2,
                state.richField = '0',
                state.allianceCentre = '0',
                state.empireCoins = '';
            state.score = {
                gathering: 0,
                spins: 0
            };
            state.totalDailyScore = 0;
            state.previousEventScore = {
                first: '',
                tenth: '',
            };

            saveData({ ...loadData(), [DAY_KEYS.DAY_THREE]: { ...state } });
        }
    },
})

export const { calculateDailyScore, resetState, updateMarchField, updateField, removeMarch, addMarch } = dayThreeSlice.actions;
export default dayThreeSlice.reducer;