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
cocktailIngredientRouter.get("/:cocktailId/ingredients", (req, res) => {
    const cocktailId = parseInt(req.params.cocktailId, 10);

    if (isNaN(cocktailId)) {
        return res.status(400).json({ error: "Invalid cocktail ID" });
    }

    const ingredients = cocktailIngredientService.getIngredientsByCocktailId(cocktailId);

    if (!ingredients || ingredients.length === 0) {
        return res.status(404).json({ error: "No ingredients found for this cocktail" });
    }

    return res.json(ingredients);
});

export { cocktailIngredientRouter };
