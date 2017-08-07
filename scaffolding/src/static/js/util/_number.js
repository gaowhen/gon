export const formatComma = (number) => `${number}`.replace(/\B(?=(?:\d{3})+\b)/g, ',')
