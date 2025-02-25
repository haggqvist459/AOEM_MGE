
// field validation, ensure only numbers are captured and stored as numbers not strings
export const cleanNumericValue = (value) => {
    const cleanedValue = typeof value === 'string' ? value.replace(/[^0-9]/g, "") : value;
    return Number(cleanedValue);

}

