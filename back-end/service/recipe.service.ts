import recipeDb from "../repository/recipe.db"
import recipeIngredientDb from "../repository/ingredient.db"
import { Recipe } from "../model/recipe";
import { RecipeInput} from "../types";

const getAllRecipes = async (): Promise<Recipe[]> => {
    return recipeDb.getAllRecipes();
}

const createRecipe = ({
                          user: userInput,
                          ingredients: recipeIngredientInputs,
                          title,
                          description,
                          instructions
}: RecipeInput) => {
    // Check if the user exists
    if(!userInput.getUserId()){throw new Error(`User with id ${userInput.getUserId()} does not exit` )}

    // Validate each ingredient
    recipeIngredientInputs.forEach((ingredientInput, index) => {
        const ingredient = recipeIngredientDb.getRecipeIngredientById({ id: ingredientInput.recipeingredientId ?? -1 });

        if (!ingredient) {
            throw new Error(`RecipeIngredient at index ${index} with ID ${ingredientInput.recipeingredientId} not found`);
        }
    });

    //check if the other feels are filled in
    if(!title || !description || !instructions){
        throw new Error('We require all the feels to be filled in.')
    }

    //we will now check if we already have the same recipe saved
    const existingRecipe = recipeDb.getRecipeByTitle({title: title})

    if(existingRecipe){throw new Error(`We already have a recipe by this tile: ${title}`)}

    //we need to creat a new recipe to go true that validation logic
    let recipe;
    try {
        recipe = new Recipe({
            user: userInput,
            title,
            description,
            instructions,
            nutritionFacts: "",
            cookingTips: "",
            extraNotes: "",
            createdAt: new Date(),
            updatedAt: new Date(),
            tags: []})
    }catch (error){
        throw new Error(`you did not provide use with a valid Recipe error: ${error}`)
    }

    return recipeDb.createRecipe(recipe)
}

export default { createRecipe, getAllRecipes }
