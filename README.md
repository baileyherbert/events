# Logging

This is an alternative event emitter that works on all platforms. It allows you to specify the event types, and keeps
the `emit` method protected.

```
npm install @baileyherbert/events
```

## Example

Extend the `EventEmitter` class and provide an enumeration of tuples for `<T>`:

```ts
import { EventEmitter } from '@baileyherbert/events';

export class Chat extends EventEmitter<Events> {
	protected _onUserConnected(user: User) {
		this.emit('connected', user.username);
	}
}

type Events = {
	/**
	 * These JSDoc comments will show up in intellisense too!
	 */
	chat: [username: string, message: string];
	connected: [username: string];
	disconnected: [username: string];
};
```

Then you can listen to those events like usual, but with autocompleted event names and typed arguments. 👍

```ts
const chat = new Chat();

chat.on('connected', username => {});
chat.on('disconnected', username => {});
chat.on('chat', (username, message) => {});
```
