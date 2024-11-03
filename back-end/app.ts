import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {recipeRouter} from "./controller/recipe.routes";
import {userRoutes} from "./controller/user.routes";

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.info(`Request: ${req.method} at: ${req.url}`);
    next();
});

app.use('/recipes', recipeRouter)
app.use('/user', userRoutes)

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Recipe share API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({ status: 'application error', message: error.message });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
