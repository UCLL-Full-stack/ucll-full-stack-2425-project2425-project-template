import { Recipe } from '../model/recipe';
import recipeDb from '../repository/recipe.db';

/* Controller endpoints:

1. Create a new recipe 
POST /recipes
Body: recipe data

2. Get a specific recipe
GET /recipes/:id

3. Update a recipe
PUT /recipes/:id
Body: updated recipe data

4. Delete a recipe
DELETE /recipes/:id

5. Get all recipes
GET /recipes
*/

const getAllRecipes = (): Recipe[] => recipeDb.getAllRecipes();

const getRecipeById = (id: number): Recipe => {
    const recipe = recipeDb.getRecipeById({ id });
    if (!recipe) throw new Error(`Recipe with id ${id} does not exist.`);
    return recipe;
};

const createRecipe = ({
    title,
    instructions,
    cookingTime,
    category,
    ingredients,
}: NewRecipeInput): Recipe => {
    const recipe = new Recipe({ title, instructions, cookingTime, category, ingredients });
    return recipeDb.addRecipe(recipe);
};
