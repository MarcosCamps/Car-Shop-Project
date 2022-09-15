import express from 'express';
import 'express-async-errors';
import carsRoute from './routes/carsRoute';
import errorHandler from './middlewares/errorMiddleware';

const app = express();

app.use(express.json());

app.use(carsRoute);
app.use(errorHandler);

export default app;