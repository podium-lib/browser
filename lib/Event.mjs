export default class Event {
    constructor(channel, topic, payload) {
        this.channel = channel;
        this.topic = topic;
        this.payload = payload;
    }
}
