import express from "express";
import cocktailIngredientService from "../service/cocktailIngredient.service";

const cocktailIngredientRouter = express.Router();

/**
 * @swagger
 * /cocktailIngredients/{cocktailId}/ingredients:
 *   get:
 *     summary: Get ingredients for a specific cocktail
 *     description: Retrieve the list of ingredients for a given cocktail by its ID
 *     parameters:
 *       - in: path
 *         name: cocktailId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the cocktail to retrieve ingredients for
 *     responses:
 *       200:
 *         description: A list of ingredients for the specified cocktail
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique ID of the cocktail-ingredient relation
 *                   cocktailId:
 *                     type: integer
 *                     description: The ID of the cocktail
 *                   ingredientId:
 *                     type: integer
 *                     description: The ID of the ingredient
 *                   amount:
 *                     type: string
 *                     description: The amount of the ingredient used
 *       400:
 *         description: Invalid cocktail ID supplied
 *       404:
 *         description: Ingredients for cocktail not found
 */
cocktailIngredientRouter.get("/:cocktailId/ingredients", async (req, res) => {
    const cocktailId = parseInt(req.params.cocktailId, 10);

    if (isNaN(cocktailId)) {
        return res.status(400).json({ error: "Invalid cocktail ID" });
    }

    try {
        const ingredients = await cocktailIngredientService.getIngredientsByCocktailId(cocktailId);

        if (!ingredients || ingredients.length === 0) {
            return res.status(404).json({ error: "No ingredients found for this cocktail" });
        }

        return res.json(ingredients);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

/**
 * @swagger
 * /cocktailIngredients/{ingredientId}/cocktails:
 *   get:
 *     summary: Get cocktails for a specific ingredient
 *     description: Retrieve the list of cocktails for a given ingredient by its ID
 *     parameters:
 *       - in: path
 *         name: ingredientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the ingredient to retrieve cocktails for
 *     responses:
 *       200:
 *         description: A list of cocktail for the specified ingredient
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique ID of the cocktail-ingredient relation
 *                   cocktailId:
 *                     type: integer
 *                     description: The ID of the cocktail
 *                   ingredientId:
 *                     type: integer
 *                     description: The ID of the ingredient
 *                   amount:
 *                     type: string
 *                     description: The amount of the ingredient used
 *       400:
 *         description: Invalid ingredient ID supplied
 *       404:
 *         description: Cocktails for ingredient not found
 */
cocktailIngredientRouter.get("/:ingredientId/cocktails", async (req, res) => {
    const ingredientId = parseInt(req.params.ingredientId, 10);

    if (isNaN(ingredientId)) {
        return res.status(400).json({ error: "Invalid ingredient ID" });
    }

    try {
        const cocktails = await cocktailIngredientService.getCocktailsByIngredientId(ingredientId);

        if (!cocktails || cocktails.length === 0) {
            return res.status(404).json({ error: "No cocktails found for this ingredient" });
        }

        return res.json(cocktails);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


export { cocktailIngredientRouter };
