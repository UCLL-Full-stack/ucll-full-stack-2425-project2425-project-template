import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { userRouter } from './controller/user.routes';
import { scheduleRouter } from './controller/schedule.routes';
import { recipeRouter } from './controller/recipe.routes';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Meal Planning API',
            version: '1.0.0',
            description: 'API for managing personal meal schedules and recipes',
        },
    },
    apis: ['./controller/*.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
