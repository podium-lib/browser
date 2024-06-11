import tap from 'tap';
import { JSDOM } from 'jsdom';

const html = /* html */ `<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
    </head>
    <body></body>
</html>`;
const dom = new JSDOM(html);
globalThis.window = dom.window;

const { PodiumBridge } = await import('@podium/bridge');
const { default: MessageBus } = await import('../src/MessageBus.js');

/** @type {import('../src/MessageBus.js').default} */
let bus;

tap.beforeEach(() => {
    // Unregister listeners and clear the global between tests for a clean slate
    if (globalThis.window['@podium']?.bridge) {
        /** @type {import('@podium/bridge').PodiumBridge} */
        const bridge = globalThis.window['@podium'].bridge;
        bridge.destroy();
    }

    globalThis.window['@podium'] = {};
    globalThis.window['@podium'].bridge = new PodiumBridge();
    bus = new MessageBus();
});

tap.test('bridge.on() - should invoke subscribed messagebus listener', (t) => {
    t.ok(
        globalThis.window['@podium'].bridge,
        'Expected the Podium bridge to be globally available',
    );

    const payload = { a: 'b' };
    bus.subscribe('foo', 'bar', (event) => {
        t.equal(event.payload, payload);
        t.end();
    });

    const rpcRequest = {
        method: 'foo/bar',
        params: payload,
        jsonrpc: '2.0',
    };

    globalThis.window.dispatchEvent(
        new globalThis.window.CustomEvent('rpcbridge', {
            detail: rpcRequest,
        }),
    );
});

tap.test('unsubscribe() - should remove subscribed listener', (t) => {
    t.ok(
        globalThis.window['@podium'].bridge,
        'Expected the Podium bridge to be globally available',
    );

    const payload = { a: 'b' };
    let count = 0;
    const listener = (event) => {
        t.equal(event.payload, payload);
        count += 1;
    };

    bus.subscribe('foo', 'bar', listener);

    const rpcRequest = {
        method: 'foo/bar',
        params: payload,
        jsonrpc: '2.0',
    };

    globalThis.window.dispatchEvent(
        new globalThis.window.CustomEvent('rpcbridge', {
            detail: rpcRequest,
        }),
    );
    globalThis.window.dispatchEvent(
        new globalThis.window.CustomEvent('rpcbridge', {
            detail: rpcRequest,
        }),
    );

    t.equal(count, 2);

    bus.unsubscribe('foo', 'bar', listener);

    globalThis.window.dispatchEvent(
        new globalThis.window.CustomEvent('rpcbridge', {
            detail: rpcRequest,
        }),
    );

    t.equal(count, 2);
    t.end();
});
