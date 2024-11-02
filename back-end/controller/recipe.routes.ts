import express, { NextFunction, Request, Response } from 'express';
import recipeService from '../service/recipe.service';

const recipeRouter = express.Router();

recipeRouter.get('/:recipeId', async (req: Request, res: Response, next: NextFunction) => {
    const { recipeId } = req.params;
    try {
        const recipe = recipeService.getRecipeById(parseInt(recipeId));
        res.status(200).json(recipe.toJSON());
    } catch (error) {
        next(error);
    }
});

export { recipeRouter };
