import axios from "axios";

export const apiValidate = (acctok: string) => {
    return axios.get(import.meta.env.VITE_URL_VALIDATE!, {
        headers: {
            Authorization: `Bearer ${acctok}`,
        },
    });
};
