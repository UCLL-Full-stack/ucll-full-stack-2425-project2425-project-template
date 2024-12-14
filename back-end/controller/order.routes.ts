/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Order:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            builds:
 *              type: array
 *              description: List of builds in order
 *            price:
 *              type: number
 *              description: Order price
 *            orderStatus:
 *              type: string
 *              description: Order status
 *            orderDate:
 *              type: string
 *              format: date-time
 *              description: Order date
 */
import express, { NextFunction, Request, Response } from 'express';
import orderService from '../service/order.service';
import { OrderInput } from '../types';

const orderRouter = express.Router();

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get a list of all orders.
 *     responses:
 *       200:
 *         description: A list of orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Order'
 */
orderRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /orders/{id}:
 *  get:
 *      summary: Get an order by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The order id.
 *      responses:
 *          200:
 *              description: An order object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Order'
 */
orderRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await orderService.getOrderById(Number(req.params.id));
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
});

// /**
//  * @swagger
//  */
// orderRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const orderInput = <OrderInput>req.body;
//         const order = await orderService.createOrder(orderInput);
//         res.status(201).json(order);
//     } catch (error) {
//         next(error);
//     }
// });

export { orderRouter };
