import { createSlice } from "@reduxjs/toolkit";
import { POINTS_AND_MULTIPLIERS, TROOP_TIER_MULTIPLIERS, loadData, saveData, cleanNumericValue } from "../../utils";


const troopTierOptions = Object.keys(TROOP_TIER_MULTIPLIERS);

const savedState = loadData();

const initialState = savedState?.dayFive || {
    troopBaseTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[0]],
    troopTargetTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[troopTierOptions.length -1]],
    promotedTroopPerBatch: '',
    trainingTime: '',
    trainingSpeedup: '',
    dailyScore: '',
    previousEventScore: {
        topOne: '',
        topTen: '',
    }
}

const dayFiveSlice = createSlice({
    name: 'dayFiveSlice',
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
            // promoted tier - base tier = score multiplier
            // troop number per training session 
            // calculate number of upgrade sessions available 
            // 
            const scorePerTroop = POINTS_AND_MULTIPLIERS.LEVEL_GAP_MULTIPLIER + (state.troopTargetTier - state.troopBaseTier);
            
            const trainingBatches = Math.floor(state.trainingSpeedup / state.trainingTime);
            
            state.dailyScore = scorePerTroop * trainingBatches * state.promotedTroopPerBatch; 


        },
        resetState: (state) => {
            state.troopBaseTier = TROOP_TIER_MULTIPLIERS[troopTierOptions[0]];
            state.troopTargetTier = TROOP_TIER_MULTIPLIERS[troopTierOptions[troopTierOptions.length -1]];
            state.promotedTroopPerBatch = '';
            state.trainingTime = '';
            state.trainingSpeedup = '';
            state.dailyScore = '';
            state.previousEventScore = {
                topOne: '',
                topTen: '',
            };


            saveData({ ...loadData(), dayFive: { ...state } });
        }
    }
})

export const { updateField, calculateDailyScore, resetState  } = dayFiveSlice.actions;
export default dayFiveSlice.reducer;