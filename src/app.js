import express from 'express';
import routes from './routes/index.js';
import mongo from './config/mongo.config.js';
import errorHandlerMiddleware from './middleware/error-handler.middleware.js'; 
import notFoundMiddleware from './middleware/not-found.middleware.js';

mongo.on('error', console.log.bind('Refused connection!'));
mongo.once('open', () => console.log('Connection with MongoDB is working!'));

const app = express();

routes(app);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

export default app;
