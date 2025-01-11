import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import activiteitRouter from './controller/activiteit.routes';
import groepRouter from './controller/groep.routes';
import leidingRouter from './controller/leiding.routes';
import { expressjwt } from 'express-jwt';
import nieuwsberichtRouter from './controller/nieuwsbericht.routes';
import helmet from 'helmet';

const app = express();
app.use(helmet());

app.use(express.json());

dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: [
            '/leiding/login',
            '/status',
            /^\/api-docs\/.*/,
            '/api-docs',
            /^\/groep\/[^\/]+\/activiteiten$/,
            /^\/groep\/[^\/]+\/leiding$/,
            /^\/groep\/[^\/]+$/,
            '/groep',
            '/nieuwsberichten',
            ],
    })
);

app.use('/leiding', leidingRouter);
app.use('/activiteit', activiteitRouter);
app.use('/groep', groepRouter);
app.use('/nieuwsberichten', nieuwsberichtRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Agenda API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else if (err.name === 'AgendaError') {
        res.status(400).json({ status: 'domain error', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});