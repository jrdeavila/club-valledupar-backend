export const getReservacionDate = (reservacion) => {
    let beginDate = new Date(reservacion.fecha_reservacion);
    const [hours, minutes] = reservacion.hora_reservacion.split(":");
    beginDate.setHours(hours);
    beginDate.setMinutes(minutes);
    let endDate = new Date(beginDate);
    endDate.setHours(endDate.getHours() + 1);

    return [beginDate, endDate];
};
