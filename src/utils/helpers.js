export const cleanNumericValue = (value) => {
    const cleanedValue = typeof value === 'string' ? value.replace(/[^0-9]/g, "") : value;
    return Number(cleanedValue);

}