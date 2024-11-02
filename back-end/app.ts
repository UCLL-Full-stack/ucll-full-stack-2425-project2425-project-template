import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './controller/user.routes';
import { accountRouter } from './controller/account.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({ origin: 'https://localhost:8080' }));
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/users', accountRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bank API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({
        status: 'application error',
        message: error.message,
    });
});
