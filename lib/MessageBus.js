import EventEmitter from 'eventemitter3';
import Event from './Event';

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
        this.ee.emit(`${channel}:${topic}`, event);
    }

    subscribe(channel, topic, listener) {
        this.ee.on(`${channel}:${topic}`, listener);
    }
}
