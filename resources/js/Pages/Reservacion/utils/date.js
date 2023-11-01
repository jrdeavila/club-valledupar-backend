import moment from "moment";

export const getReservationDate = (reservacion) => {
    const beginDate = getDateFromString(reservacion.start_date);
    const endDate = getDateFromString(reservacion.end_date);

    return [beginDate, endDate];
};

const getDateFromString = (hdateString) => {
    return moment(hdateString, "YYYY-MM-DD HH:mm:ss");
};
