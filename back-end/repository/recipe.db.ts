import { Recipe } from '../model/recipe';
import { User } from '../model/user';
import { RecipeIngredient } from '../model/recipeIngredient';
import { Ingredient } from '../model/ingredient';
import { Profile } from '../model/profile';
import { IngredientCategory } from '../types';

// Mock User
const user1 = new User({
    id: 1,
    username: 'annie',
    password: '@nnie1234',
    profile: new Profile({
        id: 1,
        firstName: 'Anette',
        lastName: 'Hardy',
        email: 'annie@ucll.be',
        user: undefined,
    }),
});

// Mock Ingredients
const ingredient1 = new Ingredient({
    id: 1,
    name: 'Spaghetti',
    category: 'Pantry' as IngredientCategory,
    recipes: [],
});
const ingredient2 = new Ingredient({
    id: 2,
    name: 'Tomato Sauce',
    category: 'Pantry' as IngredientCategory,
    recipes: [],
});
const ingredient3 = new Ingredient({
    id: 3,
    name: 'Chicken Breast',
    category: 'Meat & Fish' as IngredientCategory,
    recipes: [],
});
const ingredient4 = new Ingredient({
    id: 4,
    name: 'Lettuce',
    category: 'Produce' as IngredientCategory,
    recipes: [],
});

// Mock Recipes
const recipes: Recipe[] = [
    new Recipe({
        id: 1,
        title: 'Spaghetti Bolognese',
        instructions: 'Cook pasta, prepare sauce, mix together.',
        cookingTime: 30,
        category: 'dinner',
        ingredients: [
            new RecipeIngredient({
                recipe: null as unknown as Recipe,
                ingredient: ingredient1,
                unit: 'g',
                quantity: 200,
            }),
            new RecipeIngredient({
                recipe: null as unknown as Recipe,
                ingredient: ingredient2,
                unit: 'ml',
                quantity: 150,
            }),
        ],
        user: user1,
        imageUrl:
            'https://images.unsplash.com/photo-1622973536968-3ead9e780960?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        isFavorite: true,
    }),

    new Recipe({
        id: 2,
        title: 'Chicken Salad',
        instructions: 'Grill chicken, chop lettuce, mix together.',
        cookingTime: 20,
        category: 'lunch',
        ingredients: [
            new RecipeIngredient({
                recipe: null as unknown as Recipe,
                ingredient: ingredient3,
                unit: 'g',
                quantity: 150,
            }),
            new RecipeIngredient({
                recipe: null as unknown as Recipe,
                ingredient: ingredient4,
                unit: 'g',
                quantity: 100,
            }),
        ],
        user: user1,
        imageUrl:
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        isFavorite: false,
    }),

    new Recipe({
        id: 3,
        title: 'Grilled Cheese Sandwich',
        instructions:
            'Grill cheese between slices of bread, Butter the outside of the bread, Heat a skillet over medium heat, Cook until golden brown on both sides',
        cookingTime: 10,
        category: 'lunch',
        ingredients: [
            new RecipeIngredient({
                recipe: null as unknown as Recipe,
                ingredient: ingredient1,
                unit: 'slices',
                quantity: 2,
            }),
            new RecipeIngredient({
                recipe: null as unknown as Recipe,
                ingredient: ingredient2,
                unit: 'slices',
                quantity: 2,
            }),
            new RecipeIngredient({
                recipe: null as unknown as Recipe,
                ingredient: ingredient3,
                unit: 'tablespoons',
                quantity: 1,
            }),
            new RecipeIngredient({
                recipe: null as unknown as Recipe,
                ingredient: ingredient4,
                unit: 'tablespoons',
                quantity: 1,
            }),
        ],
        user: user1,
        imageUrl:
            'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80',
        isFavorite: true,
        notes: 'Make sure to use fresh bread for the best taste. You can add tomatoes or ham for extra flavor.',
        source: 'https://www.example.com/grilled-cheese-sandwich-recipe',
    }),
];

// Link recipes to ingredients (Mock data)
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

const saveRecipe = (recipe: Recipe): Recipe => {
    const existingRecipeId = recipes.findIndex((r) => r.getId() === recipe.getId());

    if (existingRecipeId >= 0) {
        recipes[existingRecipeId] = recipe;
    } else {
        const newId = recipes.length > 0 ? Math.max(...recipes.map((r) => r.getId() || 0)) + 1 : 1;
        recipe.setId(newId); // temporary id setting
        recipes.push(recipe);
    }

    return recipe;
};

const deleteRecipe = ({ id }: { id: number }): void => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.getId() === id);

    if (recipeIndex >= 0) {
        recipes.splice(recipeIndex, 1);
    } else {
        throw new Error(`Recipe with id ${id} does not exist.`);
    }
};

export default {
    getAllRecipes,
    getRecipeById,
    addRecipe,
    saveRecipe,
    deleteRecipe,
};
