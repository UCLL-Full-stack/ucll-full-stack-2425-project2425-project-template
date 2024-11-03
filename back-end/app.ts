// src/app.ts
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import boardRouter from './controller/board.routes';
import columnRouter from './controller/column.routes';
import guildRouter from './controller/guild.routes';
import taskRouter from './controller/task.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

// Updated CORS configuration
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  exposedHeaders: ['Authorization']
}));

app.use(bodyParser.json());

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Kanban API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Add error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: err.message
  });
});

app.use('/api/boards', boardRouter);
app.use('/api/columns', columnRouter);
app.use('/api/guilds', guildRouter);
app.use('/api/tasks', taskRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});

export default app;