import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { productRouter } from './controller/product.routes';
import { cartRouter } from './controller/cart.routes';
import { userRouter } from './controller/user.routes';
import { expressjwt } from 'express-jwt';
import { reviewRouter } from './controller/review.routes';
import { orderRouter } from './controller/order.routes';

const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({origin: 'http://localhost:8080'}));
app.use(bodyParser.json());

app.use(
    expressjwt({
    secret: process.env.JWT_SECRET || 'default_secret',
    algorithms: ['HS256'],
}).unless({
    path: [
        '/api-docs',
        /^\/api-docs\/.*/, 
        '/users/login', 
        '/users/signup', 
        '/status',
        '/products',
        /^\/products\/[^/]+$/ // Matches /products/<id> with a single segment
    ]
    
})
)

// routes
app.use('/products', productRouter);
app.use('/carts', cartRouter);
app.use('/users', userRouter);
app.use('/review', reviewRouter);
app.use('/order', orderRouter);

// Generic error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(400).json({
        status: 'application error',
        message: err.message,
    });
});

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

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
