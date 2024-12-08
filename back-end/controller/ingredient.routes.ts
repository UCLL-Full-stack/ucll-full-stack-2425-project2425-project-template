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
import { IngredientInput } from '../types';

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
        const ingredienten = await ingredientService.getAllIngredienten();
        res.status(200).json(ingredienten);
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
        const ingredient = <IngredientInput>req.body;
        const result = await ingredientService.addIngredient(ingredient);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { ingredientRouter };