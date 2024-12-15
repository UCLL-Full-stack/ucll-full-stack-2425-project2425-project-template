import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { tripRouter } from './controller/trip.routes';
import { studentRouter } from './controller/student.routes';
import { bookingRouter } from './controller/booking.routes';
import { reviewRouter } from './controller/review.routes';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';

dotenv.config();

const app = express();
app.use(helmet());

const port = process.env.APP_PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

app.use(
  expressjwt({
    secret: process.env.JWT_SECRET || (() => { throw new Error('JWT_SECRET is not defined'); })(),
    algorithms: ['HS256'],
  }).unless({
  path: ['/api-docs', /^\/api-docs\/.*/, '/students/login', '/students/signup', '/status'],
  })
)

app.use('/students', studentRouter)
app.use('/bookings', bookingRouter)
app.use('/trips', tripRouter)
app.use('/reviews', reviewRouter)

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});
const swaggerOpts = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Course API',
        version: '1.0.0',
      },
    },
    apis: ['./controller/*.routes.ts'],
  };
  
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  if(err.name === 'UnauthorizedError'){
    res.status(401).json({ status: 'application error', message: err.message});
  } else {
    res.status(400).json({ status: 'application error', message: err.message})
  }
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
