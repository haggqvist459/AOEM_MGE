import { cleanNumericValue } from "./helpers";

export const updateFieldDelegated = (state, action) => {
    const { field, value } = action.payload;
    console.log("updateFieldTest state: ", JSON.parse(JSON.stringify(state)));

    if (field in state) {
        updatePrimitiveField(state, field, value);
    } else if (state.previousEventScore && field in state.previousEventScore) {
        updatePreviousEventScore(state, field, value);
    } else if (state.speedUps && field in state.speedUps) {
        updateSpeedup(state, field, value);
    } else {
        console.error(`Invalid field: ${field} does not exist in slice state.`);
    }
};

// Internal function for top-level field updates
const updatePrimitiveField = (state, field, value) => {
    state[field] = cleanNumericValue(value);
};

// Internal function for previous event score updates
const updatePreviousEventScore = (state, field, value) => {
    state.previousEventScore[field] = cleanNumericValue(value);
};

// Internal function for speedup updates
const updateSpeedup = (state, field, value) => {
    state.speedUps[field] = cleanNumericValue(value);
};


// export const updateNestedField = (state, action) => {
//     const { field, key, value } = action.payload;
//     // console.log("updateNestedField state: ", JSON.parse(JSON.stringify(state)));

//     if (!state[field] || typeof state[field] !== "object") {
//         console.log(`Invalid nested field: ${field} does not exist or is not an object.`);
//         return;
//     }

//     if (!(key in state[field])) {
//         console.log(`Invalid key: ${key} does not exist in ${field}.`);
//         return;
//     }

//     state[field][key] = cleanNumericValue(value);
// };

// export const updatePreviousEventScore = (state, action) => {
//     const { day, field, value } = action.payload;

//     // Ensure the day exists before updating
//     if (!state[day]) {
//         console.error(`Invalid day: ${day}`);
//         return;
//     }

//     // Ensure previousEventScore exists before updating
//     if (!state[day].previousEventScore) {
//         console.error(`previousEventScore object not found in ${day}`);
//         return;
//     }

//     // Update the specific field inside previousEventScore
//     state[day].previousEventScore[field] = value;
// };