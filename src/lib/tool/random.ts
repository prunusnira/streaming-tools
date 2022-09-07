export const makeRandom = (min: number, max: number) => {
    var RandVal = Math.floor(Math.random() * (max - min + 1)) + min;
    return RandVal;
};
