import { toKey } from './utils.js';

/**
 * @template [T=unknown] payload
 */
export default class Event {
    /**
     * @constructor
     * @param {string} channel
     * @param {string} topic
     * @param {T} [payload]
     */
    constructor(channel, topic, payload) {
        this.channel = channel;
        this.topic = topic;
        this.payload = payload;
    }

    toKey() {
        return toKey(this.channel, this.topic);
    }
}
