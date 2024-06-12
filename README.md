# @podium/browser

This is a client-side library designed to:

-   send and receive messages between different podlets in a layout.
-   send and receive messages between web and native in a webview.

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

### Send messages between web and native

To send messages between web and native the [`@podium/bridge`](https://github.com/podium-lib/bridge) must be in the document. Typically you include this once in your layout so podlets can assume it's present.

The API is similar as sending messages between podlets. This way you can notify both other podlets and any native code using the same API.

```js
import { MessageBus } from '@podium/browser';

const messageBus = new MessageBus();

// notify of a logout
messageBus.publish('system', 'authentication', null);
```

The `channel` and `topic` parameters are combined to form the JSON RPC 2.0 `"method"` property. In the example above the channel `system` and topic `authentication` are combined to the method `"system/authentication"`.

To listen to messages coming in from native:

```js
import { MessageBus } from '@podium/browser';

const messageBus = new MessageBus();

// listen to the `"system/authentication"` message coming from native
messageBus.subscribe('system', 'authentication', (event) => {
    console.log(event.payload);
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
