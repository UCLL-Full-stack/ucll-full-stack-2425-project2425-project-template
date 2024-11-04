import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { projectRouter } from './controller/project.routes'; // Adjusted path

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/projects', projectRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

const swaggerOpts = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Project API',
        version: '1.0.0',
        description: 'API documentation for the Project API',
      },
    },
    apis: ['./controller/*.routes.ts'],
  };

  const swaggerSpec = swaggerJsDoc(swaggerOpts);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});

app.use((req, res, next) => {
  console.log(`Request URL: ${req.url} | Method: ${req.method}`);
  next();
});