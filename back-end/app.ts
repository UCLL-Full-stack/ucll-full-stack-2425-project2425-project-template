import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import projectRouter from './controller/project.routes';
import { userRouter } from './controller/user.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

app.use('/projects', projectRouter);
app.use('/users', userRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Courses API is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'projects API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3000, () => {
    console.log(`Project API is running on port ${port}.`);
});
