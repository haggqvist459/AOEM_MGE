import { createSlice } from "@reduxjs/toolkit";
import {
    DAY_KEYS, TROOP_TIER_MULTIPLIERS, loadData, saveData, validateInputForState,
    calculatePromotableBatches, calculateTroopPromotionScore, updateFieldDelegated,
    convertToSeconds, calculateTrainingScore
} from "../../utils";

const troopTierOptions = Object.keys(TROOP_TIER_MULTIPLIERS);

const savedState = loadData();

const initialState = savedState?.[DAY_KEYS.DAY_FIVE] || {
    troops: {
        Archers: {
            targetTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[0]],
            baseTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[troopTierOptions.length - 1]],
            availableTroops: '',
            promotedTroopsPerBatch: '',
            trainingTime: {
                days: '',
                hours: '',
                minutes: '',
                seconds: '',
            },
            troopTotalScore: 0,
            promotableBatches: 0,
            maxPromotableBatches: 0,
        },
        Cavalry: {
            targetTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[0]],
            baseTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[troopTierOptions.length - 1]],
            availableTroops: '',
            promotedTroopsPerBatch: '',
            trainingTime: {
                days: '',
                hours: '',
                minutes: '',
                seconds: '',
            },
            troopTotalScore: 0,
            promotableBatches: 0,
            maxPromotableBatches: 0,
        },
        Pikemen: {
            targetTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[0]],
            baseTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[troopTierOptions.length - 1]],
            availableTroops: '',
            promotedTroopsPerBatch: '',
            trainingTime: {
                days: '',
                hours: '',
                minutes: '',
                seconds: '',
            },
            troopTotalScore: 0,
            promotableBatches: 0,
            maxPromotableBatches: 0,
        },
        Swordsmen: {
            targetTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[0]],
            baseTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[troopTierOptions.length - 1]],
            availableTroops: '',
            promotedTroopsPerBatch: '',
            trainingTime: {
                days: '',
                hours: '',
                minutes: '',
                seconds: '',
            },
            troopTotalScore: 0,
            promotableBatches: 0,
            maxPromotableBatches: 0,
        }
    },
    trainedTroopTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[0]],
    trainedTroopsPerBatch: '',
    trainedTroopsTrainingTime: {
        days: '',
        hours: '',
        minutes: '',
        seconds: '',
    },
    initialTrainingSpeedup: {
        days: '',
        hours: '',
        minutes: '',
    },
    remainingTrainingSpeedup: {
        days: '',
        hours: '',
        minutes: '',
    },
    score: {
        training: 0,
        promoting: 0,
    },
    totalDailyScore: 0,
    previousEventScore: {
        first: '',
        tenth: '',
    }
}

const dayFiveSlice = createSlice({
    name: DAY_KEYS.DAY_FIVE,
    initialState,
    reducers: {
        updateField: (state, action) => updateFieldDelegated(state, action),
        updateTroopField: (state, action) => {
            const { troopType, field, unit, value } = action.payload;
            const validatedValue = validateInputForState(value);
 
            if (state.troops[troopType]) {
                state.troops[troopType][field] = unit ? { ...state.troops[troopType][field], [unit]: validatedValue } : validatedValue;
            } else {
                console.error(`updateTroopField error, troopType: ${troopType} does not exist in state`);
            }

        },
        calculateDailyScore: (state) => {

            // calculate the promotable batches, function updates the state
            let remainingTrainingSpeedup = calculatePromotableBatches(state.troops, state.initialTrainingSpeedup);


            // calculate the  promotion score 
            const { updatedTroops, promotionScore } = calculateTroopPromotionScore(state.troops);
            state.troops = updatedTroops;
            state.score.promoting = promotionScore;

            // calculate the training score if there's speedup remaining. 
            let trainingTimeInSeconds = convertToSeconds(state.trainedTroopsTrainingTime)
            if (!isNaN(trainingTimeInSeconds) && trainingTimeInSeconds > 0 && remainingTrainingSpeedup > trainingTimeInSeconds) {
                // console.log("calculating training score")
                state.score.training = calculateTrainingScore(state.trainedTroopTier, state.trainedTroopsPerBatch, trainingTimeInSeconds, remainingTrainingSpeedup)
            }  else {
                state.score.training = 0;
            }

            state.totalDailyScore = state.score.training + state.score.promoting
        },
        resetState: (state) => {
            state.troops = {
                Archers: {
                    targetTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[0]],
                    baseTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[troopTierOptions.length - 1]],
                    availableTroops: '',
                    promotedTroopsPerBatch: '',
                    trainingTime: {
                        days: '',
                        hours: '',
                        minutes: '',
                        seconds: '',
                    },
                    troopTotalScore: 0,
                    promotableBatches: 0,
                    maxPromotableBatches: 0,
                },
                Cavalry: {
                    targetTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[0]],
                    baseTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[troopTierOptions.length - 1]],
                    availableTroops: '',
                    promotedTroopsPerBatch: '',
                    trainingTime: {
                        days: '',
                        hours: '',
                        minutes: '',
                        seconds: '',
                    },
                    troopTotalScore: '',
                    promotableBatches: '',
                    maxPromotableBatches: '',
                },
                Pikemen: {
                    targetTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[0]],
                    baseTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[troopTierOptions.length - 1]],
                    availableTroops: '',
                    promotedTroopsPerBatch: '',
                    trainingTime: {
                        days: '',
                        hours: '',
                        minutes: '',
                        seconds: '',
                    },
                    troopTotalScore: 0,
                    promotableBatches: 0,
                    maxPromotableBatches: 0,
                },
                Swordsmen: {
                    targetTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[0]],
                    baseTier: TROOP_TIER_MULTIPLIERS[troopTierOptions[troopTierOptions.length - 1]],
                    availableTroops: '',
                    promotedTroopsPerBatch: '',
                    trainingTime: {
                        days: '',
                        hours: '',
                        minutes: '',
                        seconds: '',
                    },
                    troopTotalScore: 0,
                    promotableBatches: 0,
                    maxPromotableBatches: 0,
                }
            };
            state.initialTrainingSpeedup = {
                days: '',
                hours: '',
                minutes: ''
            };
            state.remainingTrainingSpeedup = {
                days: '',
                hours: '',
                minutes: ''
            };
            state.score = {
                training: 0,
                promoting: 0,
            };
            state.totalDailyScore = 0;
            state.previousEventScore = {
                first: '',
                tenth: '',
            };
            state.trainedTroopTier = TROOP_TIER_MULTIPLIERS[troopTierOptions[0]];
            state.trainedTroopsPerBatch = '';
            state.trainedTroopsTrainingTime = {
                days: '',
                hours: '',
                minutes: '',
                seconds: '',
            };


            saveData({ ...loadData(), [DAY_KEYS.DAY_FIVE]: { ...state } });
        }
    },
})

export const { updateTroopField, calculateDailyScore, resetState, updateField } = dayFiveSlice.actions;
export default dayFiveSlice.reducer;

