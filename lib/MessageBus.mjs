import EventEmitter from 'eventemitter3';
import Event from './Event';
import { toKey } from './utils';

function getGlobal() {
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    throw new Error('unable to locate global object');
}

function getEventEmitter() {
    let ee = getGlobal()['@podium'];
    if (!ee) {
        ee = new EventEmitter();
        getGlobal()['@podium'] = ee;
    }

    return ee;
}

export default class MessageBus {
    constructor() {
        this.ee = getEventEmitter();
    }

    publish(channel, topic, payload) {
        const event = new Event(channel, topic, payload);
        this.ee.emit(event.toKey(), event);
    }

    subscribe(channel, topic, listener) {
        this.ee.on(toKey(channel, topic), listener);
    }
}
