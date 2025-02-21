import { createSlice } from "@reduxjs/toolkit";
import { cleanNumericValue } from "../../utils";

const initialState = {
    dayOne: {},
    dayTwo: {},
    dayThree: {},
    dayFour: {},
    dayFive: {},
    daySix: {},
    daySeven: {},
};

const sharedReducersSlice = createSlice({
    name: "sharedReducers",
    initialState,
    reducers: {
        updateField: (state, action) => {
            const { day, field, value } = action.payload;
            console.log("updateField action received:", action); // Debugging log
            console.log("Full state object:", JSON.stringify(state, null, 2)); // Log the full state
            console.log(`Checking state[${day}] ->`, state[day]);
            console.log("State structure at updateField call:", JSON.stringify(state, null, 2));
            console.log("Checking state[day]:", state[day]);

            if (!state[day]) {
                console.error(`updateField: Invalid day reference: ${day}`);
                return;
            }

            state[day][field] = cleanNumericValue(value);
        },

        updatePreviousEventScore: (state, action) => {
            const { day, field, value } = action.payload;
            console.log("updatePreviousEventScore action received:", action); // Debugging log
            console.log("Full state object:", JSON.stringify(state, null, 2)); // Log the full state
            console.log(`Checking state[${day}] ->`, state[day]);
            console.log("State structure at updatePreviousEventScore call:", JSON.stringify(state, null, 2));
            console.log("Checking state[day]:", state[day]);
            if (!state[day] || !(field in state[day].previousEventScore)) {
                console.error(`updatePreviousEventScore: Invalid day (${day}) or field (${field})`);
                return;
            }

            state[day].previousEventScore[field] = cleanNumericValue(value); // ✅ Fixed!
        }
    }
});


export const { updateField, updatePreviousEventScore } = sharedReducersSlice.actions;
export default sharedReducersSlice.reducer;


// export const updateField = (state, action) => {
//     const { day, field, value } = action.payload;
//     console.log("updateField action received:", action); // Debugging log
//     if (!state[day]) {
//         console.error(`❌ updateField: Invalid day reference: ${day}`);
//         return;
//     }

//     state[day][field] = cleanNumericValue(value)
// };

// export const updatePreviousEventScore = (state, action) => {
//     const { day, field, value } = action.payload;

//     if (!state[day] || !(field in state[day].previousEventScore)) return

//     state[day].previousEventScore[field] = cleanNumericValue(value);
// };
