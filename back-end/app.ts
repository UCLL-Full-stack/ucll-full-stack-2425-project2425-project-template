import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './controller/user.routes';
import { groupRouter } from './controller/group.routes';
import { boardRouter } from './controller/board.routes';
import { statusRouter } from './controller/status.routes';
import { taskRouter } from './controller/task.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/boards', boardRouter);
app.use('/statuses', statusRouter);
app.use('/tasks', taskRouter);

app.use(cors());
app.use(bodyParser.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
