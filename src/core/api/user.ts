import axios from "axios";

export const apiGetUsers = (userid: string, acctok: string) => {
    return axios.get(`${process.env.REACT_APP_URL_PROFILE!}`, {
        headers: {
            Authorization: `Bearer ${acctok}`,
            "Client-Id": process.env.REACT_APP_CLIENT_ID!,
        },
        data: {
            login: userid,
        },
    });
};
