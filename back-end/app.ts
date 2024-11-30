import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './controller/user.routes';
import { chatRouter } from './controller/chat.routes';
import { groupchatRouter } from './controller/groupchat.routes';
const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use('/users', userRouter);
app.use('/chats', chatRouter);
app.use('/groupchats', groupchatRouter);

// error handling
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: error.message });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});


const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Team 4-18 API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



