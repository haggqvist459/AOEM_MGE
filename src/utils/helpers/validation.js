
export const validateInputForState = (value) => {
    if (typeof value !== "string") return value;

    // Replace commas with dots
    let cleaned = value.replace(/,/g, ".");

    // Remove any invalid characters (anything that isn't a number or a single decimal point)
    cleaned = cleaned.replace(/[^0-9.]/g, "");

    // Ensure only one decimal point exists
    if ((cleaned.match(/\./g) || []).length > 1) {
        cleaned = cleaned.substring(0, cleaned.lastIndexOf(".")); // Keep only the first decimal
    }

    return cleaned;
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








// // field validation, ensure only numbers are captured and stored as numbers not strings

// export const cleanNumericValueOld = (value) => {
//     if (typeof value !== "string") return value;

//     // Replace commas with dots
//     let cleaned = value.replace(",", ".");

//     // Remove any invalid characters (anything that isn't a number or a single decimal point)
//     cleaned = cleaned.replace(/[^0-9.]/g, "");

//     // Ensure only one decimal point exists
//     cleaned = cleaned.replace(/^(\d*\.\d*)\./g, "$1");

//     // If the user enters ".5", convert it to "0.5"
//     if (cleaned.startsWith(".")) {
//         cleaned = "0" + cleaned;
//     }

//     // return an empty string in case the user clears the field to ensure the placeholder is visible again. 
//     return cleaned === '' ? '' : Number(cleaned);
// };

// export const cleanNumericValue = (value) => {
//     if (typeof value !== "string") return value;

//     // Replace commas with dots
//     let cleaned = value.replace(/,/g, ".");

//     // Remove any invalid characters (anything that isn't a number or a single decimal point)
//     cleaned = cleaned.replace(/[^0-9.]/g, "");

//     // Prevent multiple decimal points
//     if ((cleaned.match(/\./g) || []).length > 1) {
//         cleaned = cleaned.substring(0, cleaned.lastIndexOf(".")); // Keep only the first decimal
//     }

//     // If the user enters ".", return it as-is (to let them continue typing)
//     if (cleaned === ".") return ".";

//     // If user enters ".5", convert it to "0.5"
//     if (cleaned.startsWith(".")) {
//         cleaned = "0" + cleaned;
//     }

//     // If the input is empty, return an empty string
//     if (cleaned === "") return "";

//     //  Use `parseFloat()` instead of `Number()` to handle decimals better
//     const parsedValue = parseFloat(cleaned);
    
//     return isNaN(parsedValue) ? cleaned : parsedValue;
// };



// export const cleanNumericValueERROR = (value) => {
//     if (typeof value !== "string") return value; // If it's already a number, return it

//     // Replace commas with dots
//     let cleaned = value.replace(/,/g, ".");

//     // Remove invalid characters (anything that isn't a number or a single decimal point)
//     cleaned = cleaned.replace(/[^0-9.]/g, "");

//     // Ensure only one decimal point exists
//     cleaned = cleaned.replace(/^(\d*\.\d*)\./g, "$1");

//     // If the user enters ".5", convert it to "0.5"
//     if (cleaned.startsWith(".")) {
//         cleaned = "0" + cleaned;
//     }

//     // If the field is completely empty, return an empty string to preserve placeholders
//     if (cleaned === "") return "";

//     //  Convert cleaned string into a number before returning
//     return Number(cleaned);
// };
