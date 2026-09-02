import axios from "axios";

export const apiGetUsers = (userid: string, acctok: string) => {
    return axios.get(import.meta.env.VITE_URL_PROFILE!, {
        headers: {
            Authorization: `Bearer ${acctok}`,
            "Client-Id": import.meta.env.VITE_CLIENT_ID!,
        },
        params: {
            login: userid,
        },
    });
};
