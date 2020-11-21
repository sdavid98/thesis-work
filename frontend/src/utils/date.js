export const dateToLocalTimeString = (date) => {
    const dateToConvert = new Date(date);
    return dateToConvert.toLocaleString(window.navigator.language);
};