import RequestError from './request.error.js';

class ValidationError extends RequestError {

	constructor(error) {
		const errorMessage = Object.values(error.errors)
			.map(error => error.message)
			.join('!; ')
		;

		super(`The following error was found: ${errorMessage}`);
	}
}

export default ValidationError;
