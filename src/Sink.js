import { toKey } from './utils.js';
import Queue from './Queue.js';

export default class Sink {
    constructor() {
        /**
         * @type {Map<string, Queue>}
         */
        this.map = new Map();
    }

    /**
     * @param {string} channel
     * @param {string} topic
     * @returns {Queue}
     */
    getQueue(channel, topic) {
        return this.map.get(toKey(channel, topic)) || new Queue();
    }

    /**
     * @param {import('./Event.js').default} event
     * @returns {void}
     */
    push(event) {
        const queue = this.getQueue(event.channel, event.topic);
        queue.push(event);
        this.map.set(event.toKey(), queue);
    }

    /**
     * @template [T=unknown]
     * @param {string} channel
     * @param {string} topic
     * @returns {import('./Event.js').default<T>}
     */
    peek(channel, topic) {
        return this.getQueue(channel, topic).peek();
    }

    /**
     * @template [T=unknown]
     * @param {string} channel
     * @param {string} topic
     * @returns {import('./Event.js').default<T>[]}
     */
    log(channel, topic) {
        return this.getQueue(channel, topic).toArray();
    }
}
