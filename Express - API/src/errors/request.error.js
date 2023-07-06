import BaseError from './base.error.js';

class RequestError extends BaseError {

	constructor(message) {
		super(message, 400);
	}
}

export default RequestError;
