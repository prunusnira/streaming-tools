import axios from "axios";
import { twitchClientId, twitchProfileUrl } from "@banpick/shared/constants/twitch";

export const apiGetUsers = (userid: string, acctok: string) => {
    return axios.get(twitchProfileUrl, {
        headers: {
            Authorization: `Bearer ${acctok}`,
            "Client-Id": twitchClientId,
        },
        params: {
            login: userid,
        },
    });
};
