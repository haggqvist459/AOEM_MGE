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
        rings: 0,
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
        calculateDailyScore: (state, action) => {
            const { field, unit } = action.payload;


            switch (field) {
                case 'fineGold':
                case 'hammers':
                case 'copperSand':
                case 'silverSand':
                case 'meteorSteel':
                    state.score.rings = 0;
                    if (state.hammers > 0) {
                        state.score.rings += state.hammers * POINTS_AND_MULTIPLIERS.FINE_CRAFT;
                    }
                    if (state.copperSand > 0) {
                        state.score.rings += state.copperSand * POINTS_AND_MULTIPLIERS.COPPER_SAND;
                    }
                    if (state.silverSand > 0) {
                        state.score.rings += state.silverSand * POINTS_AND_MULTIPLIERS.SILVER_SAND;
                    }
                    if (state.fineGold > 0) {
                        state.score.rings += state.fineGold * POINTS_AND_MULTIPLIERS.FINE_GOLD;
                    }
                    if (state.meteorSteel > 0) {
                        state.score.rings += state.meteorSteel * POINTS_AND_MULTIPLIERS.METEOR_STEEL
                    }
                    break;
                case 'universalSpeedup':
                    if (unit && state.universalSpeedup !== '') {
                        const universalMinutes = convertToMinutes(state.universalSpeedup);
                        state.score.universal = universalMinutes * POINTS_AND_MULTIPLIERS.SPEEDUP_UNIVERSAL;
                    }
                case 'researchSpeedup':
                    if (unit && state.researchSpeedup !== '') {
                        const researchMinutes = convertToMinutes(state.researchSpeedup);
                        state.score.research = researchMinutes * POINTS_AND_MULTIPLIERS.SPEEDUP_RESEARCH;
                    }
                case 'buildingSpeedup':
                    if (unit && state.buildingSpeedup !== '') {
                        const buildingMinutes = convertToMinutes(state.buildingSpeedup);
                        state.score.building = buildingMinutes * POINTS_AND_MULTIPLIERS.SPEEDUP_BUILDING;
                    }
                default:
                    console.log("Error, incorrect field supplied to score calculation: ", field);
            }
         
            // calculate total score
            state.totalDailyScore = Object.values(state.score)
                .reduce((total, score) => total + (score || 0), 0);

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
                rings: 0,
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