import tap from 'tap';
import Event from '../src/Event.js';
import { toKey } from '../src/utils.js';

tap.test('toKey() - should return key format', t => {
    const channel = 'foo';
    const topic = 'bar';
    const event = new Event(channel, topic, 'payload');
    t.ok(event.toKey() === toKey(channel, topic));
    t.end();
});
