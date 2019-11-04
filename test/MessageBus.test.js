// FIXME: Get Tap working with es moudles without rewiring `require`
// eslint-disable-next-line no-global-assign
require = require('esm')(module);
const tap = require('tap');
const MessageBus = require('../lib/MessageBus').default;

let bus;

tap.beforeEach(end => {
    bus = new MessageBus();
    end();
});

tap.test('subscribe() - should be a function', t => {
    t.ok(typeof bus.subscribe === 'function');
    t.end();
});

tap.test('publish() - should be a function', t => {
    t.ok(typeof bus.publish === 'function');
    t.end();
});

tap.test('publish() - should invoke listener', t => {
    const payload = { a: 'b' };
    bus.subscribe('foo', 'bar', event => {
        t.equal(event.payload, payload);
        t.end();
    });
    bus.publish('foo', 'bar', payload);
});
