import { UserType } from "@banpick/features/streamer/model/user";
import { TextRoulette } from "@streaming-tools/roulette";

type Props = {
    list: Array<UserType>;
    target: UserType;
};

export const RouletteDialog = ({ list, target }: Props) => (
    <TextRoulette items={list.map((user) => user.displayname)} target={target.displayname} />
);
