/**
 * @swagger
 *   components:
 *    schemas:
 *      Recipe:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: int64
 *          title:
 *            type: string
 *            description: Recipe title.
 *          instructions:
 *            type: string
 *            description: Recipe instructions.
 *          cookingTime:
 *            type: number
 *            description: Cooking time in minutes.
 *          category:
 *            type: string
 *            description: Recipe category.
 *          ingredients:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/RecipeIngredient'
 *          user:
 *            $ref: '#/components/schemas/User'
 *          imageUrl:
 *            type: string
 *            nullable: true
 *          isFavorite:
 *            type: boolean
 *            nullable: true
 *          notes:
 *            type: string
 *            nullable: true
 *          source:
 *            type: string
 *            nullable: true
 *          schedule:
 *            $ref: '#/components/schemas/Schedule'
 *            nullable: true
 *      NewRecipeInput:
 *        type: object
 *        properties:
 *          title:
 *            type: string
 *          instructions:
 *            type: string
 *          cookingTime:
 *            type: number
 *          category:
 *            type: string
 *          ingredients:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                quantity:
 *                  type: number
 *                unit:
 *                  type: string
 *      RecipeIngredient:
 *        type: object
 *        properties:
 *          ingredient:
 *            $ref: '#/components/schemas/Ingredient'
 *          unit:
 *            type: string
 *          quantity:
 *            type: number
 *      Ingredient:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: int64
 *          name:
 *            type: string
 *          category:
 *            type: string
 *          store:
 *            type: string
 *            nullable: true
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: int64
 *          username:
 *            type: string
 *          password:
 *            type: string
 *          profile:
 *            $ref: '#/components/schemas/Profile'
 *          recipes:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Recipe'
 *          schedule:
 *            $ref: '#/components/schemas/Schedule'
 *            nullable: true
 *      Profile:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: int64
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          email:
 *            type: string
 *          user:
 *            $ref: '#/components/schemas/User'
 *            nullable: true
 *      Schedule:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: int64
 *          user:
 *            $ref: '#/components/schemas/User'
 *          date:
 *            type: string
 *            format: date-time
 *          recipes:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Recipe'
 */

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
 *   post:
 *     summary: Create a new recipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewRecipeInput'
 *     responses:
 *       201:
 *         description: Recipe created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 */

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Get a specific recipe
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The recipe ID
 *     responses:
 *       200:
 *         description: A single recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Recipe not found
 *   put:
 *     summary: Update a recipe
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The recipe ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewRecipeInput'
 *     responses:
 *       200:
 *         description: Recipe updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Recipe not found
 *   delete:
 *     summary: Delete a recipe
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The recipe ID
 *     responses:
 *       204:
 *         description: Recipe deleted
 *       404:
 *         description: Recipe not found
 */

import express, { Request, Response } from 'express';

const recipeRouter = express.Router();

// Define your route handlers here

export { recipeRouter };
