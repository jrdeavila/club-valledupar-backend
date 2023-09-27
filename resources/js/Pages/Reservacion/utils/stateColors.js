export const bgByEstado = (estado, tipo) => {
    return {
        pendiente: tipoUsuarioColor(tipo),
        aceptada: "#b8fd84",
        cancelada: "#d26060",
        finalizada: "#83b5ee",
        rechazada: "#919191",
    }[estado];
};

export const textColorByEstado = (estado) => {
    return {
        pendiente: "#000000",
        aceptada: "#000000",
        cancelada: "#ffffff",
        finalizada: "#ffffff",
        rechazada: "#ffffff",
    }[estado];
};

export const tipoUsuarioColor = (tipo) =>
    ({
        turista: "#a2fff7",
        socio: "#fdb484",
    }[tipo]);
