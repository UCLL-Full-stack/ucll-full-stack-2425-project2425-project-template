import RecipeService from "../service/Recipe.service"
import { Recipe } from "../model/Recipe"
import express, { NextFunction, Request, Response } from "express"

const recipeRouter = express.Router()

recipeRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipes = await RecipeService.getAllRecipes();
        res.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
});

recipeRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipe = await RecipeService.getRecipeById(Number(req.params.id));
        if (!recipe) {
            res.status(404).json({ message: 'Recipe not found' });
            return;
        }
        res.status(200).json(recipe);
    } catch (error) {
        next(error);
    }
});

recipeRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipe = req.body as Recipe;
        const newRecipe = await RecipeService.createRecipe(recipe);
        res.status(201).json(newRecipe);
    } catch (error) {
        next(error);
    }
});

export default recipeRouter;