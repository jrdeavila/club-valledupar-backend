export const TextCurrencyFormat = (value) => {
    return Intl.NumberFormat("es", {
        currency: "COP",
        style: "currency",
        minimumFractionDigits: 0,
    }).format(value);
};
