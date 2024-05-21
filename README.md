# @podium/browser

This is a client-side library designed to send and receive messages between different podlets in a layout.

## Usage

To install:

```sh
npm install @podium/browser
```

Include the library in your client-side application.

```js
import Podium from '@podium/browser';
```

### Send messages between podlets

Use the [MessageBus](#messagebus) to send messages between podlets in a layout.

```javascript
// In podlet A. Broadcast a message.
import { MessageBus } from '@podium/browser';

const messageBus = new MessageBus();

messageBus.publish('search', 'query', 'couch');
```

```js
// In podlet B. Subscribe to a message.
import { MessageBus } from '@podium/browser';

const messageBus = new MessageBus();

messageBus.subscribe('search', 'query', (event) => {
    console.log(event.payload);
});
```

### Read the most current state on startup

When you start your application you should read the last message on a topic to make sure your app is working with the latest known state.

You may want to store this in some kind of reactive state and use [`.subscribe`](#subscribechannel-topic-callback) to update that state.

```js
import { MessageBus } from '@podium/browser';
import { map } from 'nanostores';

// The messageBus reads from a global in-memory storage.
// It can have available messages immediately after being constructed.
const messageBus = new MessageBus();

// Read the last message on a topic and fall back to a default
const initial = messageBus.peek('system', 'authentication')?.payload || {
    token: null,
};

// Example: set up a reactive state (using nanostores in this example)
const $authentication = map(initial);

// Update the reactive state on new messages
messageBus.subscribe('system', 'authentication', (event) => {
    $authentication.set({ ...event.payload, source: 'bus' });
});

// Trigger a message when writing to the state
$authentication.listen(({ token, source }) => {
    // We fire this only when the source of the change is the app, not the message bus.
    if (source !== 'bus') {
        messageBus.publish('system', 'authentication', { token });
    }
});
```

## API

### MessageBus

Cross podlet communication and message passing.
Create a new MessageBus instance to use the API.

```javascript
import { MessageBus } from '@podium/browser';

const messageBus = new MessageBus();
```

#### `.publish(channel, topic, payload)`

Publish a message for a channel and topic combination. Returns the `Event` object passed to subscribers.

This method takes the following arguments:

| option  | default | type     | required | details                   |
| ------- | ------- | -------- | -------- | ------------------------- |
| channel | `null`  | `string` | `true`   | Name of the channel       |
| topic   | `null`  | `string` | `true`   | Name of the topic         |
| payload | `null`  | any      | `false`  | The payload for the event |

Examples:

```javascript
messageBus.publish('search', 'query', 'laptop');

messageBus.publish('auth', 'logout');
```

#### `.subscribe(channel, topic, callback)`

Subscribe to messages for a channel and topic combination.

This method takes the following arguments:

| option   | default | type       | required | details                                                   |
| -------- | ------- | ---------- | -------- | --------------------------------------------------------- |
| channel  | `null`  | `string`   | `true`   | Name of the channel                                       |
| topic    | `null`  | `string`   | `true`   | Name of the topic                                         |
| callback | `null`  | `Function` | `true`   | Callback function to be invoked. Receives an event object |

Example:

```javascript
messageBus.subscribe('channel', 'topic', (event) => {
    console.log(event.payload);
});
```

#### `.unsubscribe(channel, topic, callback)`

Unsubscribe to events for a channel and topic combination.

This method takes the following arguments:

| option   | default | type       | required | details                      |
| -------- | ------- | ---------- | -------- | ---------------------------- |
| channel  | `null`  | `string`   | `true`   | Name of the channel          |
| topic    | `null`  | `string`   | `true`   | Name of the topic            |
| callback | `null`  | `Function` | `true`   | Callback function to remove. |

Example:

```javascript
function cb(event) {
    console.log(event.payload);
}

messageBus.subscribe('channel', 'topic', cb);

messageBus.unsubscribe('channel', 'topic', cb);
```

#### `.peek(channel, topic)`

Get the latest event for a channel and topic combination.

This method takes the following arguments:

| option  | default | type     | required | details             |
| ------- | ------- | -------- | -------- | ------------------- |
| channel | `null`  | `string` | `true`   | Name of the channel |
| topic   | `null`  | `string` | `true`   | Name of the topic   |

#### `.log(channel, topic)`

Returns an array of the 10 latest events for a channel and topic combination.
The array is ordered such that the the latest/newest events is at the front of the array.

This method takes the following arguments:

| option  | default | type     | required | details             |
| ------- | ------- | -------- | -------- | ------------------- |
| channel | `null`  | `string` | `true`   | Name of the channel |
| topic   | `null`  | `string` | `true`   | Name of the topic   |

Example:

```javascript
const events = messageBus.log('channel', 'topic');

events.forEach((event) => {
    console.log(event.payload);
});
```
