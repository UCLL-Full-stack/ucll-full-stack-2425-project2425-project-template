import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { userRouter } from './controller/user.routes';
import { scheduleRouter } from './controller/schedule.routes';
import { recipeRouter } from './controller/recipe.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

// Error-handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack); // logs the error
    res.status(500).json({ message: 'Something went wrong!' }); // sends an error response
});

app.use(cors());
app.use(bodyParser.json());

app.use('/schedules', scheduleRouter);
app.use('/users', userRouter);
app.use('/recipes', recipeRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
