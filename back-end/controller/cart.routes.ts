import express, { Request, Response, NextFunction } from 'express';
import cartService from '../service/cart.service';
import { Product } from '../model/product';

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
cartRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const carts = await cartService.getAllCarts();
        res.status(200).json(carts);
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
 *       description: Product to add to the cart.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Cart updated with the new product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart not found.
 */
cartRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { productId } = req.body;

    try {
        const updatedCart = await cartService.putProductInCart({ id: parseInt(id), productId: parseInt(productId) });

        if (typeof updatedCart === "string") {
            res.status(404).json({ error: updatedCart }); // Error message if cart is not found
        } else {
            res.status(200).json(updatedCart); // Updated cart response
        }
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }
});

export { cartRouter };
