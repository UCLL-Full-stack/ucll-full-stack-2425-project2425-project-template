// ---- Used in User Story 2 ----

import express, { NextFunction, Request, Response } from 'express';
import recipeService from '../service/recipe.service';

const recipeRouter = express.Router();

// Get recipe by Id
recipeRouter.get('/:recipeId', async (req: Request, res: Response, next: NextFunction) => {
    const { recipeId } = req.params;
    try {
        const recipe = await recipeService.getRecipeById(parseInt(recipeId));
        res.status(200).json(recipe.toJSON());
    } catch (error) {
        next(error); // passes the error to the error-handling middleware in app.ts
    }
});

// Update recipe based on Id
recipeRouter.put('/:recipeId', async (req: Request, res: Response, next: NextFunction) => {
    const { recipeId } = req.params;
    const recipeInputData = req.body;
    try {
        const updatedRecipe = await recipeService.updateRecipe(parseInt(recipeId), recipeInputData);
        res.status(200).json(updatedRecipe.toJSON());
    } catch (error) {
        next(error);
    }
});

// Delete recipe based on Id
recipeRouter.delete('/:recipeId', async (req: Request, res: Response, next: NextFunction) => {
    const { recipeId } = req.params;
    try {
        await recipeService.deleteRecipe(parseInt(recipeId));
        res.status(204).send(); // server processed the request but there's no response body
    } catch (error) {
        next(error);
    }
});

export { recipeRouter };
