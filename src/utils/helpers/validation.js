
export const validateInputForState = (value) => {
    if (typeof value !== "string") {
        // Handle cases where value is not a string (e.g., undefined, null, number, etc.)
        return value;
    }
    console.log("validateInputForState value: ", value);
    return value.trim() === "" ? "" : parseFloat(value);
};


export const validateInputForCalculation = (value) => {
    if (typeof value !== "string" || value.trim() === "") return 0;

    // Remove trailing decimal if present
    if (value.endsWith(".")) {
        value = value.slice(0, -1);
    }

    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? 0 : parsedValue;
};
