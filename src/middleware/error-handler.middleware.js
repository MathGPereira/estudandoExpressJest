import mongoose from 'mongoose';
import BaseError from '../errors/Base.error.js';
import IncorrectRequestError from '../errors/Incorrect-request.error.js';
import ValidationError from '../errors/Validation.error.js';
import NotFoundError from '../errors/Not-found.error.js';

function errorHandlerMiddleware(error, req, res, next) {
	if(error instanceof mongoose.Error.CastError) {
		new IncorrectRequestError().sendResponse(res);
	}else if(error instanceof mongoose.Error.ValidationError) {
		new ValidationError(error).sendResponse(res);
	}else if(error instanceof NotFoundError) {
		error.sendResponse(res);
	}else {
		new BaseError().sendResponse(res);
	}
}

export default errorHandlerMiddleware;
