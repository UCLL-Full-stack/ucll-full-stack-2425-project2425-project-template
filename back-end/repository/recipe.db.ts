import { Recipe } from '../model/recipe';
import { User } from '../model/user';
import { RecipeIngredient } from '../model/recipeIngredient';
import { Ingredient } from '../model/ingredient';
import { Profile } from '../model/profile';

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
    }),
});

// Mock Ingredients (including new ones)
const ingredient1 = new Ingredient({ id: 1, name: 'Spaghetti', category: 'Pantry' });
const ingredient2 = new Ingredient({ id: 2, name: 'Tomato Sauce', category: 'Pantry' });
const ingredient3 = new Ingredient({ id: 3, name: 'Chicken Breast', category: 'Meat & Fish' });
const ingredient4 = new Ingredient({ id: 4, name: 'Lettuce', category: 'Produce' });
const ingredient5 = new Ingredient({ id: 5, name: 'Bread', category: 'Pantry' });
const ingredient6 = new Ingredient({ id: 6, name: 'Cheese', category: 'Dairy & Eggs' });
const ingredient7 = new Ingredient({ id: 7, name: 'Butter', category: 'Dairy & Eggs' });
const ingredient8 = new Ingredient({ id: 8, name: 'Apple', category: 'Produce' });
const ingredient9 = new Ingredient({ id: 9, name: 'Mixed Vegetables', category: 'Produce' });
const ingredient10 = new Ingredient({ id: 10, name: 'Soy Sauce', category: 'Pantry' });
const ingredient11 = new Ingredient({ id: 11, name: 'Flour', category: 'Pantry' });
const ingredient12 = new Ingredient({ id: 12, name: 'Sugar', category: 'Pantry' });
const ingredient13 = new Ingredient({ id: 13, name: 'Chocolate Chips', category: 'Pantry' });

// Create RecipeIngredient instances (including new ones)
const recipe1Ingredients = [
    new RecipeIngredient({
        recipe: {} as Recipe,
        ingredient: ingredient1,
        unit: 'g',
        quantity: 200,
    }),
    new RecipeIngredient({
        recipe: {} as Recipe,
        ingredient: ingredient2,
        unit: 'ml',
        quantity: 150,
    }),
];

const recipe2Ingredients = [
    new RecipeIngredient({
        recipe: {} as Recipe,
        ingredient: ingredient3,
        unit: 'g',
        quantity: 150,
    }),
    new RecipeIngredient({
        recipe: {} as Recipe,
        ingredient: ingredient4,
        unit: 'g',
        quantity: 100,
    }),
];

const recipe3Ingredients = [
    new RecipeIngredient({
        recipe: {} as Recipe,
        ingredient: ingredient5,
        unit: 'slices',
        quantity: 2,
    }),
    new RecipeIngredient({
        recipe: {} as Recipe,
        ingredient: ingredient6,
        unit: 'g',
        quantity: 50,
    }),
    new RecipeIngredient({
        recipe: {} as Recipe,
        ingredient: ingredient7,
        unit: 'g',
        quantity: 10,
    }),
];

const recipe4Ingredients = [
    new RecipeIngredient({
        recipe: {} as Recipe,
        ingredient: ingredient8,
        unit: 'piece',
        quantity: 1,
    }),
];

const recipe5Ingredients = [
    new RecipeIngredient({
        recipe: {} as Recipe,
        ingredient: ingredient9,
        unit: 'g',
        quantity: 300,
    }),
    new RecipeIngredient({
        recipe: {} as Recipe,
        ingredient: ingredient10,
        unit: 'ml',
        quantity: 30,
    }),
];

const recipe6Ingredients = [
    new RecipeIngredient({
        recipe: {} as Recipe,
        ingredient: ingredient7,
        unit: 'g',
        quantity: 113,
    }),
    new RecipeIngredient({
        recipe: {} as Recipe,
        ingredient: ingredient11,
        unit: 'g',
        quantity: 150,
    }),
    new RecipeIngredient({
        recipe: {} as Recipe,
        ingredient: ingredient12,
        unit: 'g',
        quantity: 100,
    }),
    new RecipeIngredient({
        recipe: {} as Recipe,
        ingredient: ingredient13,
        unit: 'g',
        quantity: 170,
    }),
];

// Mock Recipes (including new ones)
const recipe1 = new Recipe({
    id: 1,
    title: 'Spaghetti Bolognese',
    instructions: 'Cook pasta, Prepare sauce, Mix together',
    cookingTime: 30,
    category: 'dinner',
    ingredients: recipe1Ingredients,
    user: user1,
    imageUrl:
        'https://images.unsplash.com/photo-1622973536968-3ead9e780960?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    isFavorite: true,
});

const recipe2 = new Recipe({
    id: 2,
    title: 'Chicken Salad',
    instructions: 'Grill chicken, Chop lettuce, Mix together',
    cookingTime: 20,
    category: 'dinner',
    ingredients: recipe2Ingredients,
    user: user1,
    imageUrl:
        'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    isFavorite: false,
});

const recipe3 = new Recipe({
    id: 3,
    title: 'Grilled Cheese Sandwich',
    instructions: 'Butter the bread, Place cheese between slices, Grill until golden brown',
    cookingTime: 10,
    category: 'lunch',
    ingredients: recipe3Ingredients,
    user: user1,
    imageUrl:
        'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80',
    isFavorite: false,
    notes: 'For extra flavor, try adding some herbs or spices to the butter before spreading.',
    source: 'https://www.simplyrecipes.com/recipes/grilled_cheese_sandwich/',
});

const recipe4 = new Recipe({
    id: 4,
    title: 'Apple Snack',
    instructions: 'Wash the apple and enjoy!',
    cookingTime: 1,
    category: 'snack',
    ingredients: recipe4Ingredients,
    user: user1,
    imageUrl:
        'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    isFavorite: false,
});

const recipe5 = new Recipe({
    id: 5,
    title: 'Vegetable Stir Fry',
    instructions:
        'Heat oil in a wok, add vegetables, stir fry for 5 minutes, add soy sauce, cook for 2 more minutes',
    cookingTime: 15,
    category: 'lunch',
    ingredients: recipe5Ingredients,
    user: user1,
    imageUrl:
        'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
    isFavorite: false,
});

const recipe6 = new Recipe({
    id: 6,
    title: 'Chocolate Chip Cookies',
    instructions:
        'Cream butter and sugar, add flour and chocolate chips, bake at 180°C for 10-12 minutes',
    cookingTime: 25,
    category: 'snack',
    ingredients: recipe6Ingredients,
    user: user1,
    imageUrl:
        'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    isFavorite: false,
});

// Set the recipe property for each RecipeIngredient instance
recipe1Ingredients.forEach((ingredient) => ingredient.setRecipe(recipe1));
recipe2Ingredients.forEach((ingredient) => ingredient.setRecipe(recipe2));
recipe3Ingredients.forEach((ingredient) => ingredient.setRecipe(recipe3));
recipe4Ingredients.forEach((ingredient) => ingredient.setRecipe(recipe4));
recipe5Ingredients.forEach((ingredient) => ingredient.setRecipe(recipe5));
recipe6Ingredients.forEach((ingredient) => ingredient.setRecipe(recipe6));

// Mock Data Export
const recipes = [recipe1, recipe2, recipe3, recipe4, recipe5, recipe6];

export default {
    getAllRecipes: (): Recipe[] => recipes,
    getRecipeById: ({ id }: { id: number }): Recipe | null => {
        return recipes.find((recipe) => recipe.getId() === id) || null;
    },
    addRecipe: (recipe: Recipe): Recipe => {
        recipes.push(recipe);
        return recipe;
    },
    saveRecipe: (recipe: Recipe): Recipe => {
        const existingRecipeIndex = recipes.findIndex((r) => r.getId() === recipe.getId());
        if (existingRecipeIndex >= 0) {
            recipes[existingRecipeIndex] = recipe;
        } else {
            const newId =
                recipes.length > 0 ? Math.max(...recipes.map((r) => r.getId() || 0)) + 1 : 1;
            recipe.setId(newId);
            recipes.push(recipe);
        }
        return recipe;
    },
    deleteRecipe: ({ id }: { id: number }): void => {
        const recipeIndex = recipes.findIndex((recipe) => recipe.getId() === id);
        if (recipeIndex >= 0) {
            recipes.splice(recipeIndex, 1);
        } else {
            throw new Error(`Recipe with id ${id} does not exist.`);
        }
    },
};
