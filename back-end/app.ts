import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
<<<<<<< HEAD
import userRouter from './controller/user.routes';
import workoutRouter from './controller/workout.routes';
=======
import userRouter from './controller/user.router';
>>>>>>> 581a3f3e5b4c93b754bbac1c25916c1e27447b03


const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRouter)
<<<<<<< HEAD
app.use('/workouts', workoutRouter)
=======
>>>>>>> 581a3f3e5b4c93b754bbac1c25916c1e27447b03

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Nalex api",
            version: "1.0.0"
        }
    },
    apis: ["./controller/*.routes.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOpts)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
