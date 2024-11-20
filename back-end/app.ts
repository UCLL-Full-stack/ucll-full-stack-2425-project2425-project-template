import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { ingredientRouter } from './controller/ingredient.routes';
import { pokebowlRouter } from './controller/pokebowl.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/ingredienten', ingredientRouter);
app.use('/pokebowls', pokebowlRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});


const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name == "IngredientenError") {
        res.status(400).json({ status: "domain error", message: err.message });
    } else {
        res.status(400).json({ status: "application error", message: err.message });
    }
});


app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
