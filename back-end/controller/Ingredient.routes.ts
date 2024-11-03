import IngredientService from "../service/Ingredient.service"
import { Ingredient } from "../model/Ingredient"
import express, { NextFunction, Request, Response } from "express"

const ingredientRouter = express.Router()

ingredientRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ingredients = await IngredientService.getAllIngredients();
        res.status(200).json(ingredients);
    } catch (error) {
        next(error);
    }
});

ingredientRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ingredient = await IngredientService.getIngredientById(Number(req.params.id));
        if (!ingredient) {
            res.status(404).json({ message: 'Ingredient not found' });
            return;
        }
        res.status(200).json(ingredient);
    } catch (error) {
        next(error);
    }
});

ingredientRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ingredient = req.body as Ingredient;
        const newIngredient = await IngredientService.createIngredient(ingredient);
        res.status(201).json(newIngredient);
    } catch (error) {
        next(error);
    }
});

export default ingredientRouter;