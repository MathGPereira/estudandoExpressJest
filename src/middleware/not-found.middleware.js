import NotFoundError from '../errors/Not-found.error.js';

function notFoundMiddleware(req, res, next) {
	const error404 = new NotFoundError();
	next(error404);
}

export default notFoundMiddleware;
