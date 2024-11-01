import { Recipe } from '../model/recipe';
import { User } from '../model/user';
import { RecipeIngredient } from '../model/recipeIngredient';
import { Ingredient } from '../model/ingredient';
import { Schedule } from '../model/schedule';
import { Profile } from '../model/profile';

// Mock data
const recipes: Recipe[] = [
    new Recipe({
        id: 0,
        title: 'Spaghetti Bolognese',
        instructions: 'Cook pasta, prepare sauce, mix together.',
        cookingTime: 30,
        category: 'Main Course',
        ingredients: [
            new RecipeIngredient({
                recipe: null as unknown as Recipe,
                ingredient: new Ingredient({ name: 'Spaghetti', category: 'Pantry', recipes: [] }),
                unit: 'g',
                quantity: 200,
            }),
            new RecipeIngredient({
                recipe: null as unknown as Recipe,
                ingredient: new Ingredient({
                    name: 'Ground Beef',
                    category: 'Meat & Fish',
                    recipes: [],
                }),
                unit: 'g',
                quantity: 300,
            }),
        ],
        user: new User({
            id: 0,
            username: 'annie',
            password: '@nnie1234',
            profile: null as unknown as Profile,
        }),
        imageUrl: '',
        isFavorite: true,
        notes: 'Family recipe',
        source: 'YouTube',
    }),
];

// Set recipe reference in ingredients
recipes.forEach((recipe) => {
    recipe.getIngredients()?.forEach((ingredient) => {
        ingredient.setRecipe(recipe);
    });
});

const getAllRecipes = (): Recipe[] => recipes;

const getRecipeById = ({ id }: { id: number }): Recipe | null => {
    return recipes.find((recipe) => recipe.getId() === id) || null;
};

const addRecipe = (recipe: Recipe): Recipe => {
    recipes.push(recipe);
    return recipe;
};

export default {
    getAllRecipes,
    getRecipeById,
    addRecipe,
};
