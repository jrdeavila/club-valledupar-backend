import moment from "moment";

export const FormatHiAtoHHmm = (value) => {
    if (value === null || value === undefined) return undefined;
    return moment(value, "H:i A").format("HH:mm");
};
