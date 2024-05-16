import EventEmitter from 'eventemitter3';
import Event from './Event.js';
import Sink from './Sink.js';
import { toKey } from './utils.js';

function getGlobalThis() {
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    throw new Error('unable to locate global object');
}

/**
 * @returns {{ ee: EventEmitter; sink: Sink; }}
 */
function getGlobalObjects() {
    let objs = getGlobalThis()['@podium'];
    if (!objs) {
        objs = {};
        getGlobalThis()['@podium'] = objs;
    }
    if (!objs.ee) {
        objs.ee = new EventEmitter();
    }
    if (!objs.sink) {
        objs.sink = new Sink();
    }
    return objs;
}

/**
 * @template [T=unknown]
 * @typedef {(message: Event<T>) => void} MessageHandler
 */

export default class MessageBus {
    constructor() {
        const { ee, sink } = getGlobalObjects();
        this.ee = ee;
        this.sink = sink;
    }

    /**
     * Returns an array of the 10 latest events for a channel and topic combination.
     * The array is ordered such that the the latest/newest events is at the front of the array.
     *
     * @template [T=unknown]
     * @param {string} channel
     * @param {string} topic
     * @returns {Event<T>[]}
     */
    log(channel, topic) {
        return this.sink.log(channel, topic);
    }

    /**
     * Get the latest event for a channel and topic.
     *
     * @template [T=unknown]
     * @param {string} channel
     * @param {string} topic
     * @returns {Event<T>}
     */
    peek(channel, topic) {
        return this.sink.peek(channel, topic);
    }

    /**
     * Publish a message for a channel and topic.
     *
     * @template [T=unknown]
     * @param {string} channel
     * @param {string} topic
     * @param {T} [payload]
     * @returns {Event<T>} Returns the {@link Event} object passed to subscribers.
     */
    publish(channel, topic, payload) {
        const event = new Event(channel, topic, payload);
        this.ee.emit(event.toKey(), event);
        this.sink.push(event);
        return event;
    }

    /**
     * Subscribe to messages for a channel and topic.
     *
     * @template [T=unknown]
     * @param {string} channel
     * @param {string} topic
     * @param {MessageHandler<T>} listener
     *
     * @example
     *
     * ```js
     * messageBus.subscribe('channel', 'topic', (event) => {
     *   console.log(event.payload);
     * });
     * ```
     */
    subscribe(channel, topic, listener) {
        this.ee.on(toKey(channel, topic), listener);
    }

    /**
     * Remove a message listener.
     *
     * @template [T=unknown]
     * @param {string} channel
     * @param {string} topic
     * @param {MessageHandler<T>} listener
     *
     * @example
     * ```js
     * // Declare the listener so it can be passed both to `subscribe` and `unsubscribe`.
     * function listener(event) {
     *   console.log(event.payload);
     * }
     *
     * messageBus.subscribe('channel', 'topic', listener);
     *
     * messageBus.unsubscribe('channel', 'topic', listener);
     * ```
     */
    unsubscribe(channel, topic, listener) {
        this.ee.off(toKey(channel, topic), listener);
    }
}
