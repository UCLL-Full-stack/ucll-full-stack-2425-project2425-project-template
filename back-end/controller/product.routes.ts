/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Product:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *              description: Product ID.
 *            name:
 *              type: string
 *              description: Product name.
 *            price:
 *              type: number
 *              format: double
 *              description: Product price.
 *            description:
 *              type: string
 *              description: Product description.
 *            rating:
 *              type: number
 *              format: float
 *              description: Product rating.
 *            url:
 *              type: string
 *              description: Product image URL.
 */
import express, { NextFunction, Request, Response } from 'express';
import productService from '../service/product.service';
const productRouter = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of all products.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
productRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a Product by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Product ID.
 *     responses:
 *       200:
 *         description: The requested product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 */
// productRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { id } = req.params;
//         const product = await productService.getProductById({ id: parseInt(id) });
//         if (product) {
//             res.status(200).json(product);
//         } else {
//             res.status(404).json({ status: 'error', errorMessage: 'Product not found' });
//         }
//     } catch (error) {
//         res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
//     }
// });

export { productRouter };
