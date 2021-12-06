import * as Main from '../src/main';

describe('main', function() {
	it('exports the expected objects', function() {
		expect(typeof Main.EventEmitter).toBe('function');
	})
});
