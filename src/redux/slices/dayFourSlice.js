import { createSlice } from "@reduxjs/toolkit";
import { POINTS_AND_MULTIPLIERS, RESOURCE_MULTIPLIER_MAP, loadData, saveData, updateFieldDelegated, convertToMinutes } from "../../utils";


const savedState = loadData();
const initialState = savedState?.dayFour || {
    hammers: '',
    copperSand: '',
    silverSand: '',
    fineGold: '',
    meteorSteel: '',
    universalSpeedup: {
        days: '',
        hours: '',
        minutes: '',
    },
    researchSpeedup: {
        days: '',
        hours: '',
        minutes: '',
    },
    buildingSpeedup: {
        days: '',
        hours: '',
        minutes: '',
    },
    score: {
        building: 0,
        research: 0,
        universal: 0,
        ring: 0,
    },
    totalDailyScore: 0,
    previousEventScore: {
        topOne: '',
        topTen: '',
    }
}

const dayFourSlice = createSlice({
    name: 'dayFourSlice',
    initialState,
    reducers: {
        updateField: (state, action) => updateFieldDelegated(state, action),
        calculateDailyScore: (state) => {

            // calculate score potential for the various minor resources
            state.score.ring = Object.entries(RESOURCE_MULTIPLIER_MAP).reduce((total, [resource, multiplierKey]) => {
                return total + state[resource] * POINTS_AND_MULTIPLIERS[multiplierKey];
            }, 0);

            const buildingMinutes = convertToMinutes(state.buildingSpeedup);
            const researchMinutes = convertToMinutes(state.researchSpeedup);
            const universalMinutes = convertToMinutes(state.universalSpeedup);

            state.score.building = buildingMinutes * POINTS_AND_MULTIPLIERS.SPEEDUP_BUILDING;
            state.score.research = researchMinutes * POINTS_AND_MULTIPLIERS.SPEEDUP_RESEARCH;
            state.score.universal = universalMinutes * POINTS_AND_MULTIPLIERS.SPEEDUP_UNIVERSAL;

            state.totalDailyScore = state.score.building + state.score.research + state.score.universal + state.score.ring


        },
        resetState: (state) => {
            state.hammers = '';
            state.copperSand = '';
            state.silverSand = '';
            state.fineGold = '';
            state.meteorSteel = '';
            state.universalSpeedup = {
                days: '',
                hours: '',
                minutes: '',
            };
            state.buildingSpeedup = {
                days: '',
                hours: '',
                minutes: '',
            };
            state.researchSpeedup = {
                days: '',
                hours: '',
                minutes: '',
            };
            state.score = {
                building: 0,
                research: 0,
                universal: 0,
                ring: 0,
            };
            state.totalDailyScore = 0;
            state.previousEventScore = {
                topOne: '',
                topTen: ''
            };
            saveData({ ...loadData(), dayFour: { ...state } });
        }
    },
})

export const { calculateDailyScore, resetState, updateField } = dayFourSlice.actions;
export default dayFourSlice.reducer;