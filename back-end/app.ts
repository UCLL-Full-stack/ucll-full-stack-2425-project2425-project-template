import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';import cors from 'cors';
import * as bodyParser from 'body-parser';
import userRouter from './controller/user.routes';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { cocktailRouter } from './controller/cocktail.routes';
import { ingredientRouter } from './controller/ingredient.routes';
import { cocktailIngredientRouter } from './controller/cocktailIngredient.routes';
import { expressjwt } from 'express-jwt';

const app = express();

dotenv.config();
const port = process.env.APP_PORT || 3000;


app.use(cors());
app.use(bodyParser.json());

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({ path: ['/api-docs', /^\/api-docs\/.*/, '/users/login', '/users/signup', '/status'] }) 
);

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation using Swagger',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./controller/*.ts'],
};


const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/users', userRouter);
app.use('/cocktails', cocktailRouter);
app.use('/ingredients', ingredientRouter);
app.use('/cocktailIngredients', cocktailIngredientRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else if (err.name === 'CoursesError') {
        res.status(400).json({ status: 'domain error', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});



app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
    console.log(`http://localhost:${port}/api-docs`);
});
