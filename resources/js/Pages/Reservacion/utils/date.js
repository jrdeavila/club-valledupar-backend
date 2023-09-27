export const getReservacionDate = (reservacion) => {
    const [year, month, day] = reservacion.fecha_reservacion.split("-");
    const [hour, minute] = reservacion.hora_reservacion.split(":");
    const beginDate = new Date(year, month - 1, day, hour, minute);
    const endDate = new Date(year, month - 1, day, hour, minute + 30);
    return [beginDate, endDate];
};
