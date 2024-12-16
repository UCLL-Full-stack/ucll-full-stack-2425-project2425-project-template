import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import competitionRouter from './controller/competition.routes';
import playerRouter from './controller/player.routes';
import userRouter from './controller/user.routes';
import { expressjwt } from 'express-jwt';


const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const swaggerOpts = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Competition API",
      version: "1.0.0",
    },
  },
  apis: ["./controller/*.ts"],
};

const swaggerDocs = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/competitions', competitionRouter);

app.use('/users', userRouter);

app.use('/players', playerRouter);

app.get('/status', (req, res) => {
  res.json({ message: 'Back-end is running...' });
});

app.listen(port || 3000, () => {
  console.log(`Back-end is running on port ${port}.`);
});


app.use(
  expressjwt({ secret: process.env.JWT_SECRET || 'default_secret', algorithms: ['HS256'] })
)
