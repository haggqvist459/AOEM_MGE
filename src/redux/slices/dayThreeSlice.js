import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import {
    POINTS_AND_MULTIPLIERS, RESOURCE_MULTIPLIERS, RESOURCE_FIELD_MAP,
    loadData, saveData, validateInputForState, updateFieldDelegated
} from "../../utils";

const resourceOptions = Object.keys(RESOURCE_FIELD_MAP);

const savedState = loadData();
const initialState = savedState?.dayThree || {
    marches: [
        {
            id: 1,
            marchName: 'March 1',
            loadBonus: '',
            gatheringTurns: '',
            loadCapacity: '',
            fullAtReset: false,
            score: 0,
        }
    ],
    nextMarchId: 2,
    richField: '0',
    allianceCentre: '0',
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
            const { id, field, value } = action.payload;

            console.log("updateMarchField action received:", action.payload);

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
                console.log("The value contains characters or special symbols.");
                state.marches[marchIndex][field] = value
            } else {
                state.marches[marchIndex][field] = validateInputForState(value);
            }
        },
        removeMarch: (state, action) => {
            const { id } = action.payload;
            console.log("removeMarch reducer with ID: ", id);
            state.marches = state.marches.filter(march => march.id !== id);
        },
        addMarch: (state) => {
            if (state.marches.length >= 5) return; // Ensure max limit of 5 marches

            const newMarch = {
                id: state.nextMarchId,
                marchName: `March ${state.nextMarchId}`,
                loadBonus: '',
                gatheringTurns: '',
                loadCapacity: '',
                fullAtReset: false,
                score: 0,
            };

            state.marches.push(newMarch);
            state.nextMarchId += 1;
        },
        calculateDailyScore: (state, action) => {
            const { id } = action.payload;
            const marchIndex = state.marches.findIndex(march => march.id === id);
            if (id === '0') {
                console.log("Default value selected in dropdown. No score calculation necessary");
                return;
            }
            if (marchIndex === -1) {
                console.error(`Invalid march ID: ${id}`);
                return;
            }
            if (id === '999') {
                // calculate empire coins score, add to daily score

                // do not calculate march score 
                return;
            }

            const march = state.marches[marchIndex];

            // Ensure necessary values exist before calculations
            if (!march.loadCapacity || !march.gatheringTurns) {
                console.warn(`Missing values for march ${id}. Skipping score calculation.`);
                return;
            }

            let gatheredResources = 0;

            // If fullAtReset is true, first assign score based on the load capacity alone
            if (march.fullAtReset) {
                gatheredResources += march.loadCapacity || 0;
            }

            // // Check if the march is at a Rich Field
            // if (march.fieldType === RESOURCE_FIELD_MAP.RICH) {
            //     const cappedYield = Math.min(march.loadCapacity || 0, RESOURCE_MULTIPLIERS.RICH);
            //     gatheredResources += cappedYield * (march.gatheringTurns || 0);
            // }
            // // Check if the march is at the Alliance Center
            // else if (march.fieldType === RESOURCE_FIELD_MAP.ALLIANCE) {
            //     gatheredResources += (march.loadCapacity || 0) * (march.gatheringTurns || 0);
            // }
            // Regular Field gathering
            else {
                const cappedYield = Math.min(march.loadCapacity || 0, RESOURCE_MULTIPLIERS.REGULAR);
                gatheredResources += cappedYield * (march.gatheringTurns || 0);
            }

            // use this divider to calculate the score as each 100 resources gathered results in 1 point
            // POINTS_AND_MULTIPLIERS.RESOURCE_DIVIDER 

            march.score = Math.floor(gatheredResources / POINTS_AND_MULTIPLIERS.RESOURCE_DIVIDER);

        },
        resetState: (state) => {
            state.marches = [
                {
                    id: 1,
                    marchName: 'March 1',
                    loadBonus: '',
                    gatheringTurns: '',
                    loadCapacity: '',
                    fullAtReset: false,
                    score: 0,
                }
            ];
            state.nextMarchId = 2,
                state.richField = '0',
                state.allianceCentre = '0',
                state.empireCoins = '';
            state.dailyScore = 0;
            state.previousEventScore = {
                topOne: '',
                topTen: '',
            };

            saveData({ ...loadData(), dayThree: { ...state } });
        }
    },
})

export const { calculateDailyScore, resetState, updateMarchField, updateField, removeMarch, addMarch } = dayThreeSlice.actions;
export default dayThreeSlice.reducer;