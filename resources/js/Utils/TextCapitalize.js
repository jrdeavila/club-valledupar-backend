export const TextCapitalize = (text) => {
    return text.replace(/\b\w/g, (c) => c.toUpperCase());
};
