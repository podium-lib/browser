import { toKey } from './utils';
import Queue from './Queue';

export default class Sink {
    constructor() {
        this.map = new Map();
    }

    getQueue(channel, topic) {
        return this.map.get(toKey(channel, topic)) || new Queue();
    }

    push(event) {
        const queue = this.getQueue(event.channel, event.topic);
        queue.push(event);
        this.map.set(event.toKey(), queue);
    }

    peek(channel, topic) {
        return this.getQueue(channel, topic).peek();
    }

    log(channel, topic) {
        return this.getQueue(channel, topic).toArray();
    }
}
