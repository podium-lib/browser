import tap from 'tap';
import Event from '../src/Event.js';
import { toKey } from '../src/utils.js';

tap.test('toKey() - should return key format', (t) => {
    const channel = 'foo';
    const topic = 'bar';
    const event = new Event(channel, topic, 'payload');
    t.ok(event.toKey() === toKey(channel, topic));
    t.end();
});

tap.test('payload infers the expected type', (t) => {
    const event = new Event('foo', 'bar', { value: 'baz' });
    t.ok(event.payload?.value);
    t.end();
});

tap.test('payload catches type error', (t) => {
    /**
     * @type {Event<{ value: string; }>}
     */
    // @ts-expect-error We want this to raise an error since { wrong: string } is not the expected type.
    const event = new Event('foo', 'bar', { wrong: 'baz' }); // eslint-disable-line no-unused-vars
    t.end();
});
