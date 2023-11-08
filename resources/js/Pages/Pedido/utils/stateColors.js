export const colorByEstado = (estado) =>
    ({
        entregado: "#89b965",
        cancelado: "#d26060",
        comandado: "#f5c542",
        enviado: "#83b5ee",
        pendiente: "#919191",
    }[estado]);
