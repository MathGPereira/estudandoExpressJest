import IncorrectRequestError from './incorrect-request.error.js';

class ValidationError extends IncorrectRequestError {

	constructor(error) {
		const errorMessage = Object.values(error.errors)
			.map(error => error.message)
			.join('; ')
		;

		super(`the following error were found: ${errorMessage}`);
	}
}

export default ValidationError;
