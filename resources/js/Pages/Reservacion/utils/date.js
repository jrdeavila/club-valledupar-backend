export const getReservationDate = (reservacion) => {
    const beginDate = getDateFromString(reservacion.start_date);
    const endDate = getDateFromString(reservacion.end_date);

    return [beginDate, endDate];
};

const getDateFromString = (hdateString) => {
    const [date, time] = hdateString.split(" ");
    const [year, month, day] = date.split("-");
    const [hour, minute] = time.split(":");

    return new Date(year, month - 1, day, hour, minute);
};
