import BaseError from './base.error.js';

class NotFoundError extends BaseError {

	constructor(message='Page not found!') {
		super(message, 404);
	}
}

export default NotFoundError
