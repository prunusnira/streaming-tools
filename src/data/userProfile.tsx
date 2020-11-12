import axios from "axios";
import Ref from "./reference";

class GetUserProfile {
    requestUserProfile = (
        userid: string, acctok: string,
        clientId: string, callback: (map: Map<string, string>) => void) => {
        axios.get(Ref.URL_PROFILE+"?login="+userid, {
            headers: {
                "Authorization": "Bearer "+acctok,
                "Client-Id": clientId
            }
        })
        .then((res) => {
            const data = res.data;
            if(data !== null || data !== undefined) {
                // map으로 만듦
                const map = new Map<string, string>();
                const dataset = data.data[0];
                map.set("login", dataset["login"]);
                map.set("display_name", dataset["display_name"]);
                map.set("profile_image_url", dataset["profile_image_url"]);
                callback(map);
            }
        });
    }
}

export default GetUserProfile;