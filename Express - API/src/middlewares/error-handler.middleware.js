import mongoose from 'mongoose';
import BaseError from '../errors/base.error.js';
import ValidationError from '../errors/validation.error.js';
import RequestError from '../errors/request.error.js';
import NotFoundError from '../errors/not-found.error.js';

function errorHandlerMiddleware(error, req, res, next) {
	if(error instanceof mongoose.Error.ValidationError) {
		new ValidationError(error).sendResponse(res);
	}else if(error instanceof mongoose.Error.CastError) {
		new RequestError().sendResponse(res);
	}else if(error instanceof NotFoundError) {
		error.sendResponse(res);
	}else {
		new BaseError().sendResponse(res);
	}
}

export default errorHandlerMiddleware;
