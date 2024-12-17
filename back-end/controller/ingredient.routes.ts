/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Ingredient:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            naam:
 *              type: string
 *              description: Ingredient naam.
 *            type:
 *              type: string
 *              description: Ingredient type.
 *            aantal:
 *              type: number
 *              description: Ingredient aantal.
 *            prijs:
 *              type: number
 *              description: Ingredient prijs.
 */
import express, { NextFunction, Request, Response } from 'express';
import ingredientService from '../service/ingredient.service';
import { IngredientInput, Rol } from '../types';

const ingredientRouter = express.Router();


/**
 * @swagger
 * /ingredienten:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all ingredienten.
 *     responses:
 *          200:
 *            description: 'Ingredieten list'
 *            content:
 *                application/json:
 *                  $ref: '#/components/schemas/Ingredient'
 * 
 */
ingredientRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { rol: Rol } };
        const { rol } = request.auth;
        const ingredienten = await ingredientService.getAllIngredienten({ rol });
        res.status(200).json(ingredienten);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /bestellingen/{id}:
 *   get:
 *     summary: Get a bestelling by ID
 *     responses:
 *       200:
 *         description: The bestelling data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bestelling'
 *       404:
 *         description: Bestelling not found
 *       500:
 *         description: Internal server error
 */
ingredientRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ingredient = await ingredientService.getIngredientById(parseInt(req.params.id));
        res.status(200).json(ingredient);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /ingredienten:
 *  post:
 *      security:
 *       - bearerAuth: []
 *      summary: Create new Ingredient
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/IngredientInput'
 *      responses:
 *        200:
 *           description: 'Create new Ingredient'
 *           content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/Ingredient'
 * 
 */
ingredientRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { rol: Rol } };
        const { rol } = request.auth;
        const ingredient = <IngredientInput>req.body;
        const result = await ingredientService.addIngredient({ rol }, ingredient);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /ingredienten:
 *  put:
 *      security:
 *       - bearerAuth: []
 *      summary: Update existing Ingredient
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/IngredientInput'
 *      responses:
 *        200:
 *           description: 'Update existing Ingredient'
 *           content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/Ingredient'
 * 
 */
ingredientRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const ingredient = <IngredientInput>req.body;
        const result = await ingredientService.updateIngredient(parseInt(id), ingredient);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});


export { ingredientRouter };