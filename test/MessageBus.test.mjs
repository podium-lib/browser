import tap from 'tap';
import MessageBus from '../lib/MessageBus';

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

tap.test('log() - should retrieve earlier events', t => {
    const channel = 'foo';
    const topic = 'foo';

    const payload1 = 'payload1';
    const payload2 = { a: 'b' };

    const event1 = bus.publish(channel, topic, payload1);
    const event2 = bus.publish(channel, topic, payload2);

    t.same(bus.log(channel, topic), [event1, event2]);
    t.end();
});
