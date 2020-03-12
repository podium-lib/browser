# @podium/browser

Podium browser library.

[![Dependencies](https://img.shields.io/david/podium-lib/browser.svg)](https://david-dm.org/podium-lib/browser)
[![GitHub Actions status](https://github.com/podium-lib/browser/workflows/Run%20Lint%20and%20Tests/badge.svg)](https://github.com/podium-lib/browser/actions?query=workflow%3A%22Run+Lint+and+Tests%22)
[![Known Vulnerabilities](https://snyk.io/test/github/podium-lib/browser/badge.svg)](https://snyk.io/test/github/podium-lib/browser)

Currently this module only includes [MessageBus](#MessageBus), but it is possible that it will include more features in the future.

## Installation

```bash
$ npm install @podium/browser
```

## MessageBus

Cross podlet communication and message passing.

### Simple usage

```javascript
// In podlet A. Broadcast an event
import { MessageBus } from '@podium/browser';

const messageBus = new MessageBus();

messageBus.publish('search', 'query', 'couch');

// In podlet B. Subscribe to an event
import { MessageBus } from '@podium/browser';

const messageBus = new MessageBus();

messageBus.subscribe('search', 'query', event => {
    console.log(event.payload);
});
```

### Constructor

Create a new MessageBus instance.

```javascript
const messageBus = new MessageBus();
```

### API

#### .publish(channel, topic, payload)

Publish an event for a channel and topic combination. Returns the event object passed to subscribers.

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

#### .subscribe(channel, topic, callback)

Subscribe to events for a channel and topic combination.

This method takes the following arguments:

| option   | default | type       | required | details                                                   |
| -------- | ------- | ---------- | -------- | --------------------------------------------------------- |
| channel  | `null`  | `string`   | `true`   | Name of the channel                                       |
| topic    | `null`  | `string`   | `true`   | Name of the topic                                         |
| callback | `null`  | `Function` | `true`   | Callback function to be invoked. Receives an event object |

Example:

```javascript
messageBus.subscribe('channel', 'topic', event => {
    console.log(event.payload);
});
```

#### .unsubscribe(channel, topic, callback)

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

#### .peek(channel, topic)

Get the latest event for a channel and topic combination.

This method takes the following arguments:

| option  | default | type     | required | details             |
| ------- | ------- | -------- | -------- | ------------------- |
| channel | `null`  | `string` | `true`   | Name of the channel |
| topic   | `null`  | `string` | `true`   | Name of the topic   |

#### .log(channel, topic)

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

events.forEach(event => {
    console.log(event.payload);
});
```

### Implementation

MessageBus uses a global singleton to coordinate message passing between different instances. This is something you need to be aware of, for instance, if writing unit tests. See [MessageBus.test.mjs](test/MessageBus.test.mjs) for an example.

## License

Copyright (c) 2019 FINN.no

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
