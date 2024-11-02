import express, { NextFunction, Request, Response } from 'express';
import recipeService from '../service/recipe.service';

const recipeRouter = express.Router();

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Get all recipes
 *     responses:
 *       200:
 *         description: A list of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 */

// Get all recipes
recipeRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipes = recipeService.getAllRecipes();
        res.status(200).json(recipes.map(recipe => recipe.toJSON()));
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /recipes/{recipeId}:
 *   get:
 *     summary: Get a recipe by ID
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the recipe to retrieve
 *     responses:
 *       200:
 *         description: A single recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Recipe not found
 */

// Get recipe by Id
recipeRouter.get('/:recipeId', async (req: Request, res: Response, next: NextFunction) => {
    const { recipeId } = req.params;
    try {
        const recipe = recipeService.getRecipeById(parseInt(recipeId));
        res.status(200).json(recipe.toJSON());
    } catch (error) {
        next(error); // passes the error to the error-handling middleware in app.ts
    }
});

/**
 * @swagger
 * /recipes/{recipeId}:
 *   put:
 *     summary: Update a recipe by ID
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the recipe to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecipeUpdateInput'
 *     responses:
 *       200:
 *         description: The updated recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Recipe not found
 */

// Update recipe based on Id
recipeRouter.put('/:recipeId', async (req: Request, res: Response, next: NextFunction) => {
    const { recipeId } = req.params;
    const recipeInputData = req.body;
    try {
        const updatedRecipe = recipeService.updateRecipe(parseInt(recipeId), recipeInputData);
        res.status(200).json(updatedRecipe.toJSON());
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /recipes/{recipeId}:
 *   delete:
 *     summary: Delete a recipe by ID
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the recipe to delete
 *     responses:
 *       204:
 *         description: Recipe deleted successfully
 *       404:
 *         description: Recipe not found
 */

// Delete recipe based on Id
recipeRouter.delete('/:recipeId', async (req: Request, res: Response, next: NextFunction) => {
    const { recipeId } = req.params;
    try {
        recipeService.deleteRecipe(parseInt(recipeId));
        res.status(204).send(); // server processed the request but there's no response body
    } catch (error) {
        next(error);
    }
});

export { recipeRouter };
