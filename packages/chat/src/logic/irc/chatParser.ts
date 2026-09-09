export const chatParser = (msg: string): Map<string, string> => {
    const map = new Map<string, string>();
    const parsed = msg.split(" ");

    if (parsed[2] !== "PRIVMSG") return map;

    parsed[0].split(";").forEach((value) => {
        const [key, ...rest] = value.split("=");
        map.set(key, rest.join("="));
    });

    const id = parsed[1]?.split("!")[0]?.slice(1) ?? "";
    map.set("userid", id);
    map.set("msg", parsed.slice(4).join(" ").replace(/^:/, ""));
    return map;
};
