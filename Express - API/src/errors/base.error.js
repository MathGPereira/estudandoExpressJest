class BaseError extends Error {

	constructor(message = 'There was a server failure', status = 500) {
		super();
		this.message = message;
		this.status = status;
	}

	sendResponse(res) {
		res.status(this.status).json({
			status: this.status,
			message: this.message
		});
	}
}

export default BaseError;
