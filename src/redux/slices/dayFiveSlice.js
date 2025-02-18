import { createSlice } from "@reduxjs/toolkit";
import { TROOP_TIER_MULTIPLIERS, loadData, saveData, cleanNumericValue, calculateHighTierPromotableBatches } from "../../utils";


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
        updatePromotionField: (state, action) => {
            const { troopType, field, value } = action.payload;
            state.troops[troopType][field] = cleanNumericValue(value);
        },
        calculateDailyScore: (state) => {
            // find the highest target tier amongst the troops to promote
            const highestTargetTier = Math.max(...Object.values(state.troops).map(troop => troop.targetTier));
            console.log("highestTargetTier:", highestTargetTier);
            // split the troop types into groups based on target tier
            let highestTierTroops = [];
            let lowerTierTroops = [];

            // group the troop types based on promotion tier 
            Object.keys(state.troops).forEach((troopType) => {
                const troop = state.troops[troopType];
                console.log("Processing troopType:", troopType, "Data:", state.troops[troopType]);
                console.log("troop data ", troop.trainingTime);
                console.log("troop data ", troop.availableTroops);
                console.log("troop data ", troop.promotedTroopPerBatch);

                // Check if any of the required values are missing or invalid
                if (
                    troop.trainingTime === '' || troop.promotedTroopPerBatch === '' || troop.availableTroops === ''
                ) return;
            
                if (
                    troop.targetTier === highestTargetTier && 
                    !highestTierTroops.some(t => t === troop) // Ensures no duplicates
                ) {
                    highestTierTroops.push(troop);
                    console.log("highestTierTroops.push(troop);");
                    console.log("highestTierTroops.push(troop) troop.trainingTime;", troop.trainingTime);
                    console.log("highestTierTroops.push(troop) troop.availableTroops;", troop.availableTroops);
                    console.log("highestTierTroops.push(troop) troop.promotedTroopPerBatch;", troop.promotedTroopPerBatch);
                } else {
                    lowerTierTroops.push(troop);
                    console.log("lowerTierTroops.push(troop);");
                    console.log("lowerTierTroops.push(troop) troop.trainingTime;", troop.trainingTime);
                    console.log("lowerTierTroops.push(troop) troop.availableTroops;", troop.availableTroops);
                    console.log("lowerTierTroops.push(troop) troop.promotedTroopPerBatch;", troop.promotedTroopPerBatch);
                }
            });

            console.log("lowerTierTroops length: ", lowerTierTroops.length);
            // Step 1: Calculate promotions for the highest-tier troops
            const { troopUpdates, remainingSpeedup } = calculateHighTierPromotableBatches(highestTierTroops, state.trainingSpeedup);

            console.log("troopUpdates content:", troopUpdates);
            console.log("state.troops content:", state.troops);
            // Apply the troop updates to state
            // Object.keys(troopUpdates).forEach((troopType) => {
            //     state.troops[troopType].maxPromotableBatches = troopUpdates[troopType].maxPromotableBatches;
            //     state.troops[troopType].promotableBatches = troopUpdates[troopType].promotableBatches;
            // });

            // Store remaining speed-ups for promoting lower-tier troops in the next step
            state.remainingSpeedup = remainingSpeedup
            // move on to assign speed ups to lower tier batches if speedups remain. 

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
    }
})

export const { updateField, updatePromotionField, calculateDailyScore, resetState } = dayFiveSlice.actions;
export default dayFiveSlice.reducer;