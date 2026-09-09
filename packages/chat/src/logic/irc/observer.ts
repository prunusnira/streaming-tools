export class Subject {
    private message = "";
    private readonly observers: Array<Observer> = [];
    private updateFunction: (message: string) => void = () => {};

    setFunction = (updateFunction: (message: string) => void) => {
        this.updateFunction = updateFunction;
    };

    attach = (observer: Observer) => {
        if (!this.observers.includes(observer)) this.observers.push(observer);
    };

    notify = () => {
        this.observers.forEach((observer) => observer.update(this.message, this.updateFunction));
    };

    updateMessage = (message: string) => {
        this.message = message;
    };
}

export class Observer {
    update = (message: string, updateFunction: (message: string) => void) => {
        updateFunction(message);
    };
}
