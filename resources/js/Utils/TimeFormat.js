import moment from "moment";
import "moment/locale/es";

export const FormatHiAtoHHmm = (value) => {
    if (value === null || value === undefined) return undefined;
    return moment(value, "H:i A").format("HH:mm");
};

export const FormatTimeAgo = (value) => {
    if (value === null || value === undefined) return undefined;
    moment.locale("es");
    return moment(value).fromNow();
};
