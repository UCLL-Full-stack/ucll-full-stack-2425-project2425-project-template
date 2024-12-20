import * as dotenv from 'dotenv';
import express, { NextFunction, Router, Request, Response } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import playerRouter from './controller/player.routes';
import { userRouter } from './controller/user.routes';
import { statsRouter } from './controller/stats.routes';
import { teamRouter } from './controller/team.routes';
import { coachRouter } from './controller/coach.routes';
import { matchRouter } from './controller/match.routes';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';


const app = express();
app.use(helmet());


app.use(
    helmet.contentSecurityPolicy({
        directives: {
            connectSrc: ["'self'", "http://localhost:8080"],
            }
        }
    )
)

dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: ['/api-docs', /^\/api-docs\/.*/, '/users/login', '/users/signup', '/status' ]
    })
)

app.use(cors({ origin: 'http://localhost:8080'}));
app.use(bodyParser.json());




app.use('/players', playerRouter);
app.use('/users', userRouter);
app.use('/stats', statsRouter);
app.use('/teams', teamRouter);
app.use('/coaches', coachRouter);
app.use('/matches', matchRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});


const swaggerOpts = {
    definition:{
        openapi: '3.0.0',
        info: {
            title: 'Man Shitty API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
}


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError'){
        res.status(401).json({status: 'Unauthorized', message: err.message});
    } else if (err.name === 'CoursesError'){
        res.status(400).json( {status: 'domain error', message: err.message});
    }
    else {
        res.status(400).json({ status: 'application error', message: err.message});
    }
});

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))