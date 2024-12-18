import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { playerRouter } from './controller/player.routes';
import { worldRouter } from './controller/world.routes';
import { floorRouter } from './controller/floor.routes';
import { userRouter } from './controller/user.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;
app.use(cors({ origin: ['http://localhost:8080', 'http://www.cedvinvu.be'] }));
app.use(bodyParser.json());

// routes
app.use('/users', userRouter);
app.use('/players', playerRouter);
app.use('/world', worldRouter);
app.use('/floor', floorRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
