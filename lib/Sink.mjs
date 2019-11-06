import { toKey } from './utils';

export default class Sink {
    constructor() {
        this.map = new Map();
    }

    push(event) {
        // Not actually a stack yet...
        const stack = this.read(event.channel, event.topic);
        stack.push(event);
        this.map.set(event.toKey(), stack);
    }

    read(channel, topic) {
        return this.map.get(toKey(channel, topic)) || [];
    }
}
