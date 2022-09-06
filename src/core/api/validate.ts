import axios from "axios";

export const apiValidate = (acctok: string) => {
    return axios.get(process.env.REACT_APP_URL_VALIDATE!, {
        headers: {
            Authorization: `Bearer ${acctok}`,
        },
    });
};
