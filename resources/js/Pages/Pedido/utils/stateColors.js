export const colorByEstado = (estado) =>
    ({
        entregado: "#89b965",
        cancelado: "#d26060",
        enviado: "#83b5ee",
        pendiente: "#919191",
    }[estado]);
