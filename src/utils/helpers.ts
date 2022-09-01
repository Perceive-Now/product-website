export const getNumberShortForm = (number: number, maxFraction: number = 1) => {
    return Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumFractionDigits: maxFraction
    }).format(number);
}