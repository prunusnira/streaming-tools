import axios from "axios";
import { twitchValidateUrl } from "@banpick/shared/constants/twitch";

export const apiValidate = (acctok: string) => {
    return axios.get(twitchValidateUrl, {
        headers: {
            Authorization: `Bearer ${acctok}`,
        },
    });
};
