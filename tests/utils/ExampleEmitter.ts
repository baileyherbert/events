import { EventEmitter } from '../../src/EventEmitter';

export class ExampleEmitter extends EventEmitter<ExampleEmitterEvents> {

	public emitTest() {
		this.emit('test', 'It works!');
	}

	public emitSecondTest() {
		this.emit('second_test', 'It still works!');
	}

}

type ExampleEmitterEvents = {
	test: [message: string];
	second_test: [message: string];
};
