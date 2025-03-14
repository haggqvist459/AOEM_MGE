import { validateInputForState } from '../helpers'

export const updateFieldDelegated = (state, action) => {
    const { field, unit, value } = action.payload;
    console.log("updateFieldDelegated state: ", JSON.parse(JSON.stringify(state)));
    console.log("updateFieldDelegated field: ", field)
    console.log("updateFieldDelegated unit: ", unit)
    console.log("updateFieldDelegated value: ", value)

    // If the value is numeric, proceed with validation
    const validatedValue = validateInputForState(value)
    // Case 1: Top-level objects with primitive fields (e.g., previousEventScore, initialTrainingSpeedup)

    if (state[field] && typeof state[field] === "object" && !Array.isArray(state[field])) {
        // Update an object field with its primitive value
        updateObjectField(state, field, unit, validatedValue);
        return;
    } else if (field in state) {
        // Case 3: Primitive fields (e.g., stamina, score, etc.)
        updatePrimitiveField(state, field, validatedValue);
        return;
    } else {
        console.error(`Invalid field: ${field} does not exist in slice state.`);
    }

}


// Internal function for top-level field updates
const updatePrimitiveField = (state, field, value) => {
    console.log(`updatePrimitiveField before update: state[field] `, JSON.parse(JSON.stringify(state[field])));
    console.log(`updatePrimitiveField before update: value: `, value);
    state[field] = value;
    console.log(`updatePrimitiveField after update: state[field]`, state[field]);
};


const updateObjectField = (state, field, unit, value) => {
    console.log(`updateObjectField before update: state[field] `, JSON.parse(JSON.stringify(state[field])));
    console.log(`updateObjectField before update: unit: `, unit);
    console.log(`updateObjectField before update: value: `, value);


    state[field] = {
        ...state[field], // Keep the existing values
        [unit]: value, // Update only the relevant field
    };


    console.log(`updateObjectField after update: state[field]`, state[field]);
};

