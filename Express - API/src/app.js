import express from 'express';
import routes from './routes/index.route.js';
import mongo from './config/mongo.config.js';
import errorHandlerMiddleware from './middlewares/error-handler.middleware.js';
import notFoundMiddleware from './middlewares/not-found.middleware.js';

mongo.on('error', console.log.bind('Refused conncetion!'));
mongo.once('open', () => console.log('Connection with MongoDB is working!'));

const app = express();

routes(app);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
