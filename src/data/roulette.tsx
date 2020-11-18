class Roulette {
    originData: Array<Object>;
    selectData: Array<Object>;

    currentIdx: number;
    selected: number;

    roll: NodeJS.Timeout|null;
    size: number;

    randomHere: boolean;

    constructor(data: Array<Object>, random: boolean = true) {
        this.originData = data;
        this.selectData = new Array<Object>(41);
        this.randomHere = random;

        this.currentIdx = 0;
        this.selected = 0;

        this.roll = null;
        this.size = this.originData.length;
    }

    setupPos = (pos: number) => {
        this.selected = pos;
    }

    start = () => {
        let pos = 0;
        // 1. size 중 랜덤 결정
        if(this.randomHere) {
            let pos = Math.random() * this.size;
            if(pos === this.size) pos -= 1;
            this.selected = pos;
        }
        else {
            pos = this.selected;
        }

        // 2. size 값 +- 20 범위로 리스트 생성 (총 41)
        const min = pos - 20;
        const max = pos + 20;
        let minusTurns = 0;
        let minusLeft = 0;
        let plusTurns = 0;
        let plusLeft = 0;

        if(min < 0) {
            minusTurns = (min * -1) / this.size;
            minusLeft = (min * -1) % this.size;
        }

        if(max > this.size) {
            plusTurns = max / this.size;
            plusLeft = max % this.size;
        }

        let idx = 0;
        if(min < 0) {
            idx = this.size - minusLeft - 1;
        }
        else {
            idx = min;
        }
        this.currentIdx = idx;

        for(let i = 0; i < 20; i++) {
            this.selectData[i] = this.originData[idx];
            idx++;
            if(idx >= this.size) idx = 0;
        }

        this.selectData[20] = this.originData[idx];
        idx++;
        if(idx >= this.size) idx = 0;

        for(let i = 21; i < 41; i++) {
            this.selectData[i] = this.originData[idx];
            idx++;
            if(idx >= this.size) idx = 0;
        }
    }

    roulette = (callback: (obj: Object) => void) => {
        this.roll = setInterval(() => {
            callback(this.changeObject());
            this.currentIdx++;
            if(this.currentIdx == this.size) this.currentIdx = 0;
        }, 50);
    }

    changeObject = () => {
        return this.selectData[this.currentIdx];
    }

    stop = (callback: (obj: Object) => void, second: number) => {
        setTimeout(() => {
            clearInterval(this.roll!);
            this.currentIdx = 21;
            callback(this.changeObject());
        }, second * 1000);
    }
}

export default Roulette;