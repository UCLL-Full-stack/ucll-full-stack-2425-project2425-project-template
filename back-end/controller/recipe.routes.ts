/**
 * @swagger
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         user:
 *           $ref: '#/components/schemas/User'
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         instructions:
 *           type: string
 *         nutritionFacts:
 *           type: string
 *         cookingTips:
 *           type: string
 *         extraNotes:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     RecipeInput:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         ingredients:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RecipeIngredient'
 *         user:
 *           $ref: '#/components/schemas/User'
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         instructions:
 *           type: string
 *         nutritionFacts:
 *           type: string
 *         cookingTips:
 *           type: string
 *         extraNotes:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Tag'
 */
import express, {NextFunction, Request, Response} from "express";
import recipeService from "../service/recipe.service";
import {RecipeInput} from "../types";

const recipeRouter = express.Router();

/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Post a new Recipe.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecipeInput'
 *     responses:
 *       200:
 *         description: the created recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 */
recipeRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipe = <RecipeInput>req.body;
        const result = recipeService.createRecipe(recipe);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Retrieve a list of all recipes.
 *     responses:
 *       200:
 *         description: A list of recipes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 */

recipeRouter.get('/',async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const result = recipeService.getAllRecipes()
        res.status(200).json(result)
    }catch (error){
        next(error)
    }
})

export { recipeRouter };