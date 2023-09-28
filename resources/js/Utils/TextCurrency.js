export const TextCurrencyFormat = (value) => {
    return Intl.NumberFormat("es", {
        currency: "COP",
        style: "currency",
    }).format(value);
};
