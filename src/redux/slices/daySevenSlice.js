import { createSlice } from "@reduxjs/toolkit";
import {
    DAY_KEYS, TROOP_TIER_MULTIPLIERS, TRIBE_LEVEL_MULTIPLIERS, POINTS_AND_MULTIPLIERS,
    updateFieldDelegated, loadData, saveData,
} from "../../utils";

const savedState = loadData();
const dropdownOptions = Object.keys(TRIBE_LEVEL_MULTIPLIERS);
const troopTierOptions = Object.keys(TROOP_TIER_MULTIPLIERS);

const initialState = savedState?.[DAY_KEYS.DAY_SEVEN] || {
    stamina: '',
    tribeLevelMultiplier: TRIBE_LEVEL_MULTIPLIERS[dropdownOptions[0]],
    tribesHunted: 0,
    epicMedals: '',
    legendaryMedals: '',
    epicScrolls: '',
    legendaryScrolls: '',
    hammers: '',
    copperSand: '',
    silverSand: '',
    fineGold: '',
    meteorSteel: '',
    empireCoins: '',
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
        tribes: 0,
        medals: 0,
        scrolls: 0,
        rings: 0,
        troops: 0,
        building: 0,
        research: 0,
        gathering: 0,
        adventSpins: 0,
    },
    totalDailyScore: 0,
    previousEventScore: {
        first: '',
        tenth: '',
    }
}

const daySevenSlice = createSlice({
    name: DAY_KEYS.DAY_SEVEN,
    initialState,
    reducers: {
        updateField: (state, action) => updateFieldDelegated(state, action),
        calculateDailyScore: (state, action) => {
            const { field, unit } = action.payload

            switch (field) {
                case 'stamina':
                    if (state.stamina > 0) {
                        const validStamina = state.stamina - (state.stamina % POINTS_AND_MULTIPLIERS.STAMINA_PER_TRIBE)
                        state.tribesHunted = validStamina / POINTS_AND_MULTIPLIERS.STAMINA_PER_TRIBE
                        state.score.tribes = state.tribesHunted * state.tribeLevelMultiplier
                    }
                    break;
                case 'epicMedals':
                case 'legendaryMedals':
                    state.score.medals = 0; // Reset before adding values
                    if (state.epicMedals > 0) {
                        state.score.medals += state.epicMedals * POINTS_AND_MULTIPLIERS.EPIC_MEDAL;
                    }
                    if (state.legendaryMedals !== '' || state.legendaryMedals <= 0) {
                        state.score.medals += state.legendaryMedals * POINTS_AND_MULTIPLIERS.LEGENDARY_MEDAL;
                    }
                    break;
                case 'epicScrolls':
                case 'legendaryScrolls':
                    state.score.scrolls = 0; // Reset before adding values
                    if (state.epicScrolls > 0) {
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
                    break;
                case 'researchPower':
                    if (state.researchPower > 0) {
                        state.score.research = state.researchPower * POINTS_AND_MULTIPLIERS.POWER_RESEARCH;
                    }
                    break;
                case 'buildingPower':
                    if (unit && state.buildingPower[unit] > 0) {
                        state.score.building = Object.values(state.buildingPower)
                            .filter(value => value !== '') // Ignore missing values
                            .reduce((total, power) => total + (POINTS_AND_MULTIPLIERS.POWER_BUILDING * power), 0);
                    }
                    break;
                case 'troopPower':
                    if (unit && state.troopPower[unit] > 0) {
                        state.score.troop = state.troopPower.troopsTrainedTotal * state.troopPower.tier * POINTS_AND_MULTIPLIERS.POWER_TRAINING
                    }
                    break;

                default:
                    console.log("Error, incorrect field supplied to score calculation: ", field);
            }
            // calculate total score
            state.totalDailyScore = Object.values(state.score)
            .reduce((total, score) => total + (score || 0), 0);

        },
        resetState: (state) => {
            state.stamina = '';
            state.tribeLevelMultiplier = TRIBE_LEVEL_MULTIPLIERS[dropdownOptions[0]];
            state.tribesHunted = 0;
            state.epicMedals = '';
            state.legendaryMedals = '';
            state.epicScrolls = '';
            state.legendaryScrolls = '';
            state.hammers = '';
            state.copperSand = '';
            state.silverSand = '';
            state.fineGold = '';
            state.meteorSteel = '';
            state.empireCoins = '';
            state.troopPower = {
                troopsTrainedTotal: '',
                tier: TROOP_TIER_MULTIPLIERS[troopTierOptions[0]],
            };
            state.researchPower = '';
            state.buildingPower = {
                firstQueue: '',
                secondQueue: '',
                thirdQueue: '',
            };
            state.score = {
                tribes: 0,
                medals: 0,
                scrolls: 0,
                rings: 0,
                troops: 0,
                building: 0,
                research: 0,
                gathering: 0,
                adventSpins: 0,
            };
            state.totalDailyScore = 0;
            state.previousEventScore = {
                first: '',
                tenth: '',
            };

            saveData({ ...loadData(), [DAY_KEYS.DAY_SEVEN]: { ...state } });
        }
    },
})

export const { calculateDailyScore, resetState, updateField } = daySevenSlice.actions;
export default daySevenSlice.reducer;