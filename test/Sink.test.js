import tap from 'tap';
import Sink from '../src/Sink.js';

let sink;

tap.beforeEach(() => {
    sink = new Sink();
});

tap.test('log() - should be a function', (t) => {
    t.ok(typeof sink.log === 'function');
    t.end();
});

tap.test('log() - should initially return an empty array', (t) => {
    t.same(sink.log('foo', 'bar'), []);
    t.end();
});

tap.test('push() - should be a function', (t) => {
    t.ok(typeof sink.push === 'function');
    t.end();
});
