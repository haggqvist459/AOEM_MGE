import { createSlice } from "@reduxjs/toolkit";
import { TROOP_POWER_MULTIPLIER, TROOP_TIER_MULTIPLIERS, POINTS_AND_MULTIPLIERS, 
    saveData, loadData, updateFieldDelegated } from "../../utils";

const troopTierOptions = Object.keys(TROOP_TIER_MULTIPLIERS);

const savedState = loadData();

const initialState = savedState?.daySix || {
    troopPower: {
        troopsTrainedTotal: '',
        tier: TROOP_TIER_MULTIPLIERS[troopTierOptions[0]],
    },
    researchPower: '',
    buildingPower: {
        firstQueue: '',
        secondQueue: '',
        thirdQueue: '',
    },
    score: {
        building: 0,
        research: 0,
        troop: 0,
    },
    totalDailyScore: 0,
    previousEventScore: {
        topOne: '',
        topTen: '',
    }
}


const daySixSlice = createSlice({
    name: 'daySixSlice',
    initialState,
    reducers: {
        updateField: (state, action) => updateFieldDelegated(state, action),
        calculateDailyScore: (state) => {
            console.log('calculateDailyScore start');
        
            // Building Score Calculation (Ignoring Empty Values)
            state.score.building = Object.values(state.buildingPower)
                .filter(value => value !== '') // Ignore missing values
                .reduce((total, power) => total + (POINTS_AND_MULTIPLIERS.POWER_BUILDING * power), 0);
            
            console.log('state.score.building:', state.score.building);
        
            // Research Score Calculation (Ensuring Empty Values are Skipped)
            state.score.research = state.researchPower !== '' 
                ? state.researchPower * POINTS_AND_MULTIPLIERS.POWER_RESEARCH 
                : 0;
            
            console.log('state.score.research:', state.score.research);
        
            // Troop Score Calculation (Ensuring Empty Values are Skipped)
            state.score.troop = state.troopPower.troopsTrainedTotal !== '' 
            ? state.troopPower.troopsTrainedTotal  * state.troopPower.tier * POINTS_AND_MULTIPLIERS.POWER_TRAINING
            : 0;
            
            console.log('state.score.troop:', state.score.troop);
        
            // Update Total Score
            state.totalDailyScore = state.score.building + state.score.research + state.score.troop;
        },
        resetState: (state) => {
            state.troopPower = {
                troopsTrainedTotal: '',
                tier: TROOP_TIER_MULTIPLIERS[troopTierOptions[0]]
            };
            state.researchPower = '';
            state.buildingPower = {
                firstQueue: '',
                secondQueue: '',
                thirdQueue: '',
            };
            state.score = {
                building: 0,
                research: 0,
                troop: 0,
            }
            state.totalDailyScore = 0;
            state.previousEventScore = {
                topOne: '',
                topTen: '',
            };

            saveData({ ...loadData(), daySix: { ...state } });
        }
    }
})

export const { calculateDailyScore, resetState, updateField } = daySixSlice.actions;
export default daySixSlice.reducer;