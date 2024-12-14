import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { trainerRouter } from './controller/trainer.routes';

const app = express();

// Load environment variables
dotenv.config();
const port = process.env.APP_PORT || 3000;

// CORS configuration
app.use(cors({ origin: 'http://localhost:8080' }));

// Body Parser for JSON requests
app.use(bodyParser.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pokémon Trainer API',
      version: '1.0.0',
      description: 'API documentation for the Pokémon Trainer service',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // The path to the API route files
  apis: ['./controller/trainer.routes.ts'], // Make sure this points to your routes where Swagger annotations are written
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use the trainerRouter for other routes
app.use('/trainers', trainerRouter);

// Status endpoint
app.get('/status', (req, res) => {
  res.json({ message: 'Back-end is running...' });
});

// Start the server
app.listen(port, () => {
  console.log(`Back-end is running on port ${port}.`);
});
