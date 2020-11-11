import { forEachChild } from "typescript";

class Parser {
    static parse = (msg: string): Map<string, string> => {
        const map = new Map<string, string>();
        const parsed = msg.split(" ");
        // 빈칸으로 모두 나누고, 앞은 다 버려도 됨
        // parsed[0] = 채팅 정보들 >> 파싱해서 display-name은 가져와야 됨
        // parsed[1] = 유저정보 >> :아이디!아이디@아이디.tmi.twitch.tv
        // parsed[2] = 메시지 종류
        // parsed[3] = #채널명
        // parsed[4+] = :채팅내용

        if(parsed[2] === "PRIVMSG") {
            const userinfo = parsed[0].split(";");
            userinfo.forEach(s => {
                const keypair = s.split("=");
                if(keypair[0] === "display-name") {
                    map.set("nickname", keypair[1]);
                }
            });
    
            let id = parsed[1].split("!")[0];
            map.set("userid", id.substring(1, id.length));
    
            // 채팅 내용
            let chat = "";
            for(let i = 4; i < parsed.length; i++) {
                if(i == 4) {
                    const splited = parsed[i].split(":");
                    for(let i = 1; i < splited.length; i++) {
                        chat += splited[i];
                        if(i !== splited.length - 1) {
                            chat += ":";
                        }
                    }
                }
                else {
                    chat += parsed[i];
                }
                if(i < parsed.length - 1) chat += " ";
            }
            map.set("msg", chat);
        }
        return map;
    }
}

export default Parser;