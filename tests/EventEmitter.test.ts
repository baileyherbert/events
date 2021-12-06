import { EventEmitter } from '../src/EventEmitter';
import { EventTrap } from './utils/EventTrap';
import { ExampleEmitter } from './utils/ExampleEmitter';

describe('EventEmitter', function() {
	const example = new ExampleEmitter();
	const trap = new EventTrap(example, 'test');

	afterEach(function() {
		trap.reset();
	});

	it('test is set up correctly', function() {
		expect(example).toBeInstanceOf(EventEmitter);
		expect(typeof example.emitTest).toBe('function');

		expect(typeof example.on).toBe('function');
		expect(typeof example.once).toBe('function');
		expect(typeof example.removeAllListeners).toBe('function');
		expect(typeof example.removeListener).toBe('function');
	});

	it('supports on() listeners', function() {
		trap.connectOn();
		example.emitTest();
		example.emitTest();

		expect(trap.captures.length).toBe(2);
		expect(trap.captures[0].args).toEqual(['It works!']);
	});

	it('supports once() listeners', function() {
		trap.connectOnce();
		example.emitTest();
		example.emitTest();

		expect(trap.captures.length).toBe(1);
		expect(trap.captures[0].args).toEqual(['It works!']);
	});

	it('can remove all listeners', function() {
		trap.connectOn();
		example.emitTest();
		example.emitTest();

		example.removeAllListeners();
		example.emitTest();

		expect(trap.captures.length).toBe(2);
	});

	it('can remove individual listeners', function() {
		const secondTrap = new EventTrap(example, 'test').connectOn();
		const thirdTrap = new EventTrap(example, 'second_test').connectOn();
		trap.connectOn();

		// Emit once and detach the second trap
		example.emitTest();
		secondTrap.detach();

		// Emit two different events to make sure the detach didn't affect them
		example.emitTest();
		example.emitSecondTest();

		expect(trap.captures.length).toBe(2);
		expect(secondTrap.captures.length).toBe(1);
		expect(thirdTrap.captures.length).toBe(1);

		// Cleanup
		secondTrap.reset();
		thirdTrap.reset();
	});

	it('type checks', function() {
		// @ts-expect-error
		example.on('');

		// @ts-expect-error
		example.once('');

		// @ts-expect-error
		example.on('test', (message: number) => { });
		example.on('test', (message: string) => { });

		// @ts-expect-error
		example.once('test', (message: number) => { });
		example.once('test', (message: string) => { });

		// @ts-expect-error
		example.on('doesnt_exist', () => { });

		// @ts-expect-error
		example.once('doesnt_exist', () => { });
	});

});
