import tap from 'tap';
import MessageBus from '../lib/MessageBus';

let bus;

tap.beforeEach(end => {
    // Need to clear the global between tests for a clean slate
    // eslint-disable-next-line no-undef
    globalThis['@podium'] = null;
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

tap.test('publish() - should invoke subscribed listener', t => {
    const payload = { a: 'b' };
    bus.subscribe('foo', 'bar', event => {
        t.equal(event.payload, payload);
        t.end();
    });
    bus.publish('foo', 'bar', payload);
});

tap.test('unsubscribe() - should remove subscribed listener', t => {
    const channel = 'channel';
    const topic = 'topic';

    let cbCount = 0;

    const callback = event => {
        t.equal(event.channel, channel);
        t.equal(event.topic, topic);
        cbCount += 1;
    };

    bus.subscribe(channel, topic, callback);

    bus.publish(channel, topic);
    bus.publish(channel, topic);

    t.equal(cbCount, 2, 'Callback function should have been invoked twice');

    // Try unsubscribing and yet another publish
    bus.unsubscribe(channel, topic, callback);
    bus.publish(channel, topic);

    t.equal(
        cbCount,
        2,
        'Callback function was invoked even though we unsubscribed',
    );

    t.end();
});

tap.test('peek() - should initially be undefined', t => {
    t.ok(bus.peek('channel', 'topic') === undefined);
    t.end();
});

tap.test('peek() - should return latest event', t => {
    const channel = 'channel';
    const topic = 'topic';

    for (let i = 0; i <= 3; i += 1) {
        const event = bus.publish(channel, topic, i);
        t.equal(event, bus.peek(channel, topic));
    }

    t.end();
});

tap.test('log() - should initially be empty', t => {
    t.same(bus.log('channel', 'topic'), []);
    t.end();
});

tap.test('log() - should retrieve earlier events, newest first', t => {
    const channel = 'channel';
    const topic = 'topic';

    const payload1 = 'payload1';
    const payload2 = { a: 'b' };

    const event1 = bus.publish(channel, topic, payload1);
    const event2 = bus.publish(channel, topic, payload2);

    t.same(bus.log(channel, topic), [event2, event1]);
    t.end();
});
