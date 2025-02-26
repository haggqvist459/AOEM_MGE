import { createSlice } from "@reduxjs/toolkit";
import { TROOP_TIER_MULTIPLIERS, loadData, saveData, validateInputForState, calculatePromotableBatches, calculateTroopPromotionScore } from "../../utils";
// import { sharedReducers } from '../slices'

const troopTierOptions = Object.keys(TROOP_TIER_MULTIPLIERS);

const savedState = loadData();

const initialState = savedState?.dayFive || {
    troops: {
        Archers: {
            baseTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[0]],
            targetTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[troopTierOptions.length - 1]],
            availableTroops: '',
            promotedTroopPerBatch: '',
            trainingTime: '',
            troopTotalScore: '',
            promotableBatches: '',
            maxPromotableBatches: '',
        },
        Cavalry: {
            baseTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[0]],
            targetTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[troopTierOptions.length - 1]],
            availableTroops: '',
            promotedTroopPerBatch: '',
            trainingTime: '',
            troopTotalScore: '',
            promotableBatches: '',
            maxPromotableBatches: '',
        },
        Pikemen: {
            baseTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[0]],
            targetTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[troopTierOptions.length - 1]],
            availableTroops: '',
            promotedTroopPerBatch: '',
            trainingTime: '',
            troopTotalScore: '',
            promotableBatches: '',
            maxPromotableBatches: '',
        },
        Swordsmen: {
            baseTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[0]],
            targetTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[troopTierOptions.length - 1]],
            availableTroops: '',
            promotedTroopPerBatch: '',
            trainingTime: '',
            troopTotalScore: '',
            promotableBatches: '',
            maxPromotableBatches: '',
        }
    },
    trainedTroopTier: '',
    trainedTroopsPerBatch: '',
    initialTrainingSpeedup: '',
    remainingTrainingSpeedup: '',
    promotionScore: 0,
    trainingScore: 0,
    totalDailyScore: 0,
    previousEventScore: {
        topOne: '',
        topTen: '',
    }
}

const dayFiveSlice = createSlice({
    name: 'dayFiveSlice',
    initialState,
    reducers: {
        updatePromotionField: (state, action) => {
            const { troopType, field, value } = action.payload;
            state.troops[troopType][field] = validateInputForState(value);
        },
        calculateDailyScore: (state) => {
            // find the highest target tier amongst the troops to promote
            const highestTargetTier = Math.max(...Object.values(state.troops).map(troop => troop.targetTier));
            // console.log("highestTargetTier:", highestTargetTier);
            // split the troop types into groups based on target tier
            let highestTierTroops = {};
            let lowerTierTroops = {};

            // group the troop types based on promotion tier 
            Object.keys(state.troops).forEach((troopType) => {
                const troop = state.troops[troopType];
                // Check if any of the required values are missing or invalid
                if (
                    troop.trainingTime === '' || troop.promotedTroopPerBatch === '' || troop.availableTroops === ''
                ) return;

                if (
                    troop.targetTier === highestTargetTier &&
                    !(troopType in highestTierTroops) // Ensures no duplicates
                ) {
                    highestTierTroops[troopType] = troop;
                } else {
                    lowerTierTroops[troopType] = troop;
                }
            });

            const { updatedHighestTierTroops, updatedLowerTierTroops, remainingSpeedup } = calculatePromotableBatches(highestTierTroops, lowerTierTroops, state.initialTrainingSpeedup)

            // update state with the new values for promotable batches 
            Object.keys(updatedHighestTierTroops).forEach(troopType => {
                state.troops[troopType] = updatedHighestTierTroops[troopType];
            });

            Object.keys(updatedLowerTierTroops).forEach(troopType => {
                state.troops[troopType] = updatedLowerTierTroops[troopType];
            });

            // Update remaining speedup in state
            state.remainingTrainingSpeedup = remainingSpeedup;

            // calculate the score 
            const { updatedTroops, promotionScore } = calculateTroopPromotionScore(state.troops);
            state.troops = updatedTroops;
            state.promotionScore = promotionScore;

        },
        resetState: (state) => {
            state.baseTier = TROOP_TIER_MULTIPLIERS[troopTierOptions[0]];
            state.targetTier = TROOP_TIER_MULTIPLIERS[troopTierOptions[troopTierOptions.length - 1]];
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
    },
    // extraReducers: (builder) => {
    //     sharedReducers(builder);    
    // }
})

export const { updatePromotionField, calculateDailyScore, resetState } = dayFiveSlice.actions;
export default dayFiveSlice.reducer;

