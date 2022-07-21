const TimerWorker = () => {
    let time = 0;
    let timerHandle: NodeJS.Timer | null = null;
    let isRunning = false;

    const runTimer = () => {
        if (!isRunning) {
            isRunning = true;
            timerHandle = setInterval(() => {
                time++;
                postMessage(time);
            }, 1000);
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

    onmessage = (ev) => {
        console.log(ev.data);
        if (ev.data === "start") {
            runTimer();
        } else if (ev.data === "stop") {
            stopTimer();
        } else if (ev.data === "reset") {
            resetTimer();
        }
    };
};

let code = TimerWorker.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));
const blob = new Blob([code], { type: "application/javascript" });
const TimerWorkerScript = URL.createObjectURL(blob);

export default TimerWorkerScript;
