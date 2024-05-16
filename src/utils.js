/**
 * Creates a key of `channel:topic`.
 *
 * @param {string} channel
 * @param {string} topic
 * @returns {string}
 */
export function toKey(channel, topic) {
    return `${channel}:${topic}`;
}
