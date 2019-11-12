export class Event {
    channel: string;
    topic: string;
    payload?: unknown;
}

export class MessageBus {
    constructor();

    publish(channel: string, topic: string, payload?: unknown): void;

    subscribe(
        channel: string,
        topic: string,
        callback: (event: Event) => void,
    ): void;

    unsubscribe(channel: string, topic: string, callback: Function): void;

    peek(channel: string, topic: string): Event | void;

    log(channel: string, topic: string): Event[];
}
