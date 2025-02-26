import { validateInputForState, validateInputForCalculation } from '../helpers'

export const updateFieldDelegated = (state, action) => {
    const { field, value } = action.payload;
    console.log("updateFieldDelegated state: ", JSON.parse(JSON.stringify(state)));

    if (state[field] && typeof state[field] === "object") {
        console.log("updateTimeField condition met");
        updateTimeField(state, field, value);
    }  else if (field in state) {
        console.log("updatePrimitiveField condition met");
        updatePrimitiveField(state, field, value);
    } else if (state.previousEventScore && field in state.previousEventScore) {
        console.log("updatePreviousEventScore condition met");
        updatePreviousEventScore(state, field, value);
    }  else {
        console.error(`Invalid field: ${field} does not exist in slice state.`);
    }
};

// Internal function for top-level field updates
const updatePrimitiveField = (state, field, value) => {
    state[field] = validateInputForState(value);
};

// Internal function for previous event score updates
const updatePreviousEventScoreASD = (state, field, value) => {
    state.previousEventScore[field] = validateInputForState(value);
};
const updatePreviousEventScore = (state, field, value) => {
    const cleanedValue = validateInputForState(value);

    // Store as number if valid, otherwise keep as empty string
    state.previousEventScore[field] = cleanedValue === "" ? "" : Number(cleanedValue);
};

// Internal function for time-based updates
const updateTimeField = (state, field, value) => {
    console.log(`Before update: state[${field}]`, JSON.parse(JSON.stringify(state[field])))
    if (!state[field]) {
        state[field] = { days: '', hours: '', minutes: '' }; // Reset to an empty object instead of null
        console.error(`Invalid time-based field: ${field} does not exist.`);
        return;
    }

    state[field] = { ...state[field], ...value }; // Only update changed keys (day, hour, min)
    console.log(`After update: state[${field}]`, JSON.parse(JSON.stringify(state[field])))
};