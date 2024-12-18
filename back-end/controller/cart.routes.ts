import express, { Request, Response, NextFunction } from 'express';
import cartService from '../service/cart.service';
import { Product } from '../model/product';
import { Cart } from '../model/cart';
import { Role } from '../types';

const cartRouter = express.Router();

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Retrieve a list of all carts.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of carts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 */
    // GET /carts/
cartRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: {email: string; role : Role}};
        const { email,role } = request.auth;
        const carts = await cartService.getAllCarts({email,role});
        res.status(200).json(carts);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }
});

/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Create a new cart.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Cart object to create.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       201:
 *         description: Cart created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Invalid input.
 */
// POST /carts
cartRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const cartData = req.body;

    try {
        const newCart = await cartService.createCart(Cart.from(cartData));
        res.status(201).json(newCart);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }
});

/**
 * @swagger
 * /carts/{id}:
 *   put:
 *     summary: Add a product to a specific cart.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The cart ID.
 *     requestBody:
 *       description: Product ID to add to the cart.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cart updated with the new product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart or Product not found.
 */
// PUT /carts/:id
// cartRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.params;
//     const { productId } = req.body;

//     try {
//         const updatedCart = await cartService.putProductInCart({
//             id: parseInt(id),
//             productId: parseInt(productId),
//         });

//         if (typeof updatedCart === "string") {
//             res.status(404).json({ error: updatedCart });
//         } else {
//             res.status(200).json(updatedCart);
//         }
//     } catch (error) {
//         res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
//     }
// });

export { cartRouter };
