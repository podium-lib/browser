import tap from 'tap';
import { toKey } from '../lib/utils';

tap.test('toKey() - should return key format', t => {
    const channel = 'foo';
    const topic = 'bar';
    t.ok(toKey(channel, topic) === `${channel}:${topic}`);
    t.end();
});
