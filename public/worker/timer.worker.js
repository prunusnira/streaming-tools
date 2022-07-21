// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    // eslint-disable-next-line no-restricted-globals
    let time = 0;
    let timerHandle = null;
    let isRunning = false;

    const runTimer = () => {
        if (!isRunning) {
            isRunning = true;
            timerHandle = setInterval(() => {
                time++;
                console.log(time);
                postMessage(time);
            }, 10);
        }
    };

    const stopTimer = () => {
        if (timerHandle !== null) {
            clearInterval(timerHandle);
            isRunning = false;
        }
    };

    const resetTimer = () => {
        stopTimer();
        time = 0;
        postMessage(time);
    };

    self.onmessage = (ev) => {
        console.log(ev.data);
        if (ev.data === "start") {
            console.log("start check");
            runTimer();
        } else if (ev.data === "stop") {
            stopTimer();
        } else if (ev.data === "reset") {
            resetTimer();
        }
    };
};
