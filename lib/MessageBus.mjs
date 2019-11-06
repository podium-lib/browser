import EventEmitter from 'eventemitter3';
import Event from './Event';
import Sink from './Sink';
import { toKey } from './utils';

function getGlobalThis() {
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    throw new Error('unable to locate global object');
}

function getGlobalObjects() {
    let objs = getGlobalThis()['@podium'];
    if (!objs) {
        objs = {};
        objs.ee = new EventEmitter();
        objs.sink = new Sink();
        getGlobalThis()['@podium'] = objs;
    }

    return objs;
}

export default class MessageBus {
    constructor() {
        const { ee, sink } = getGlobalObjects();
        this.ee = ee;
        this.sink = sink;
    }

    log(channel, topic) {
        return this.sink.read(channel, topic);
    }

    publish(channel, topic, payload) {
        const event = new Event(channel, topic, payload);
        this.ee.emit(event.toKey(), event);
        this.sink.push(event);
        return event;
    }

    subscribe(channel, topic, listener) {
        this.ee.on(toKey(channel, topic), listener);
    }
}
