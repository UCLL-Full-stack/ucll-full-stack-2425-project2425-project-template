import express, { Router, Request, Response, NextFunction } from "express";
import ingredientService from "../service/ingredient.service";

const ingredientRouter = express.Router();

/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Get a list of all ingredients.
 *     responses:
 *       200:
 *         description: A list of ingredients.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ingredient_id:
 *                     type: integer
 *                     description: The unique identifier for the ingredient.
 *                   name:
 *                     type: string
 *                     description: The name of the ingredient.
 */
ingredientRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ingredients = await ingredientService.getAllIngredients();
        res.status(200).json(ingredients);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /ingredients/{id}:
 *  get:
 *      summary: Get an ingredient by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The ingredient id.
 *      responses:
 *          200:
 *              description: An ingredient object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            ingredient_id:
 *                              type: integer
 *                              description: The unique identifier for the ingredient.
 *                            name:
 *                              type: string
 *                              description: The name of the ingredient.
 */
ingredientRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ingredient = await ingredientService.getIngredientById({ id: Number(req.params.id) });
        res.status(200).json(ingredient);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /ingredients:
 *   post:
 *     summary: Add a new ingredient.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ingredientName:
 *                 type: string
 *                 example: "Tomato"
 *                 description: The name of the ingredient.
 *     responses:
 *       201:
 *         description: The ingredient has been added.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ingredient_id:
 *                   type: integer
 *                   description: The unique identifier for the ingredient.
 *                 name:
 *                   type: string
 *                   description: The name of the ingredient.
 *       400:
 *         description: Invalid input.
 */
ingredientRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ingredientName } = req.body;
        if (!ingredientName) {
            return res.status(400).json({ message: 'Ingredient name is required.' });
        }
        
        const newIngredient = await ingredientService.addIngredient(ingredientName);
        res.status(201).json(newIngredient);
    } catch (error) {
        next(error);
    }
});

export { ingredientRouter };
