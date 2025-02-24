// import { cleanNumericValue } from "../../utils";

// // NOT IN USE. 

// // Define shared actions
// export const updateField = createAction("sharedReducers/updateField");
// export const updatePreviousEventScore = createAction("sharedReducers/updatePreviousEventScore");
// export const updateSpeedup = createAction("sharedReducers/updateSpeedup");

// // Define shared reducer functions
// export const sharedReducers = (builder, sliceName) => {
//     builder
//         .addCase(updateField, (state, action) => {
//             const { day, field, value } = action.payload;
//             if (day !== sliceName) {
//                 console.log("returning from updateField without action");
//                 return;
//             };
//             console.log("updateField received: ", action.payload);
//             console.log("checking sliceName: ", sliceName);
//             console.log("State before update: ", JSON.parse(JSON.stringify(state)));
//             if (!(field in state)) {
//                 console.log(`Invalid field: ${field} does not exist in the slice state.`);
//                 return;
//             }

//             state[field] = cleanNumericValue(value);
//             console.log("Updated state:", JSON.parse(JSON.stringify(state)));
//         })
//         .addCase(updatePreviousEventScore, (state, action) => {
//             const { field, value } = action.payload;

//             if (!state.previousEventScore || !(field in state.previousEventScore)) {
//                 console.log(`Invalid previousEventScore field: ${field}`);
//                 return;
//             }

//             state.previousEventScore[field] = cleanNumericValue(value);
//         })
//         .addCase(updateSpeedup, (state, action) => {
//             const { field, value } = action.payload;

//             // Ensure the field exists in the state (e.g., trainingSpeedup, forgingSpeedup, etc.)
//             if (!state[field] || typeof state[field] !== "object") {
//                 console.log(`Invalid speedup field: ${field} does not exist.`);
//                 return;
//             }

//             // Ensure we're updating a valid key inside the speedup object (days, hours, minutes)
//             if (!(value.key in state[field])) {
//                 console.log(`Invalid key inside ${field}: ${value.key}`);
//                 return;
//             }

//             state[field][value.key] = cleanNumericValue(value.value);
//             console.log(` Updated ${field}:`, JSON.parse(JSON.stringify(state[field])));
//         });
// };






























































// // import { createSlice } from "@reduxjs/toolkit";


// // const initialState = {}

// // const sharedReducerSlice = createSlice({
// //     name: "sharedReducer",
// //     initialState,
// //     reducers: {
// //         updateField: (state, action) => {
// //             const { day, field, value } = action.payload;
// //             console.log("updateField action received:", action); // Debugging log
// //             console.log("Full state object:", JSON.stringify(state, null, 2)); // Log the full state
// //             console.log(`Checking state[${day}] ->`, state[day]);
// //             console.log("State structure at updateField call:", JSON.stringify(state, null, 2));
// //             console.log("Checking state[day]:", state[day]);

// //             if (!state[day]) {
// //                 console.error(`updateField: Invalid day reference: ${day}`);
// //                 return;
// //             }

// //             state[day][field] = cleanNumericValue(value);
// //         },

// //         updatePreviousEventScore: (state, action) => {
// //             const { day, field, value } = action.payload;
// //             console.log("updatePreviousEventScore action received:", action); // Debugging log
// //             console.log("Full state object:", JSON.stringify(state, null, 2)); // Log the full state
// //             console.log(`Checking state[${day}] ->`, state[day]);
// //             console.log("State structure at updatePreviousEventScore call:", JSON.stringify(state, null, 2));
// //             console.log("Checking state[day]:", state[day]);
// //             if (!state[day] || !(field in state[day].previousEventScore)) {
// //                 console.error(`updatePreviousEventScore: Invalid day (${day}) or field (${field})`);
// //                 return;
// //             }

// //             state[day].previousEventScore[field] = cleanNumericValue(value);
// //         }
// //     }
// // });


// // export const { updateField, updatePreviousEventScore } = sharedReducerSlice.actions;
// // export default sharedReducerSlice.reducer;











// ///NOT IN USE FOR NOW 


