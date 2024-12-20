import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { playerRouter } from './controller/player.routes';
import { worldRouter } from './controller/world.routes';
import { floorRouter } from './controller/floor.routes';
import { userRouter } from './controller/user.routes';
import { expressjwt } from 'express-jwt';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;
app.use(cors({ origin: ['http://localhost:8080', 'http://www.cedvinvu.be'] }));
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Project API',
            version: '1.0.0',
            description: 'API documentation for the project',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Local server',
            },
        ],
    },
    apis: ['./controller/*.routes.ts'], // Path to the API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(
    expressjwt({
        secret:
            process.env.JWT_SECRET ||
            (() => {
                throw new Error('JWT_SECRET is not defined');
            })(),
        algorithms: ['HS256'],
    }).unless({
        path: ['/api-docs', /^\/api-docs\/.*/, '/users/login', '/users/signup'],
    })
);

// routes
app.use('/users', userRouter);
app.use('/players', playerRouter);
app.use('/world', worldRouter);
app.use('/floor', floorRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});
