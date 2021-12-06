import { EventEmitter } from '../../src/EventEmitter';

export class EventTrap {

	public captures = new Array<Capture>();
	protected _listeners = new Set<(...args: any[]) => any>();

	public constructor(protected target: EventEmitter, protected eventName: string) {

	}

	/**
	 * Binds to the emitter with the `on` method.
	 */
	public connectOn() {
		const handler = (...args: any[]) => {
			this.captures.push({
				type: 'on',
				args
			});
		};

		this.target.on(this.eventName, handler);
		this._listeners.add(handler);
		return this;
	}

	/**
	 * Binds to the emitter with the `once` method.
	 */
	public connectOnce() {
		const handler = (...args: any[]) => {
			this.captures.push({
				type: 'once',
				args
			});
			this._listeners.delete(handler);
		};

		this.target.once(this.eventName, handler);
		this._listeners.add(handler);
		return this;
	}

	/**
	 * Disconnects all handlers and clears captures.
	 */
	public reset() {
		this.captures = [];
		this.target.removeAllListeners();
	}

	/**
	 * Detaches active listeners in this trap.
	 */
	public detach() {
		for (const listener of this._listeners) {
			this.target.removeListener(this.eventName, listener);
		}
	}

}

export interface Capture {
	type: 'on' | 'once';
	args: any[];
}
