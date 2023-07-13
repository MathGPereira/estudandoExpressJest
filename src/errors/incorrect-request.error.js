import BaseError from './base.error.js';

class IncorrectRequestError extends BaseError {

	constructor(message) {
		super(message, 400);
	}
}

export default IncorrectRequestError;
