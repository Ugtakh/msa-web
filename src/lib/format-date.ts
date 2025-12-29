import moment from "moment";

export const formatDate = (locale: string, dateString: string | null) => {
    if (!dateString) return "";

    moment.locale(locale);
    return moment(dateString).format("YYYY-MM-DD");
};