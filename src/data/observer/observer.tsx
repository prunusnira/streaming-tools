interface ISubject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(): void;

    updateMessage(msg: string): void;
}

interface IObserver {
    update(subject: Subject, updateFunction: (msg: string) => void): void;
}

export class Subject implements ISubject {
    public msg: string = "";
    public observers: Observer[] = [];
    public updateFunction: (msg: string) => void;

    constructor(updateFunction: (msg: string) => void) {
        this.updateFunction = updateFunction;
    }

    attach = (observer: Observer) => {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    };

    detach = (observer: Observer) => {
        if (this.observers.includes(observer)) {
            this.observers.splice(this.observers.indexOf(observer), 1);
        }
    };

    notify = () => {
        this.observers.forEach((o) => {
            o.update(this, this.updateFunction);
        });
    };

    updateMessage = (msg: string) => {
        this.msg = msg;
    };
}

export class Observer implements IObserver {
    update = (subject: Subject, updateFunction: (msg: string) => void): void => {
        updateFunction(subject.msg);
    };
}
