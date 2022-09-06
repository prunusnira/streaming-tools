export enum Phase {
    Ready,
    Pick,
    Ban,
}

export type StatusType = {
    phase: Phase;
    totalPick: number;
    pickPhase: number;
    banPhase: number;
    run: boolean;
    join: boolean;
    teamVisible: boolean;
};
