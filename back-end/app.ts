import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {albumRouter} from './controller/album.routes';
import { listRouter } from './controller/list.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/status', (req: Request, res: Response) => {
    res.json({ message: 'Back-end is running...' });
});

app.use('/albums', albumRouter);
app.use('/lists', listRouter);
app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    res.status(400).json({status: 'application error', message: err.message});
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Yadig API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
