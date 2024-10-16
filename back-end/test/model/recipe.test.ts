import { Recipe } from '../../model/recipe';
import { User } from '../../model/user';
import { Tag } from '../../model/tags';

let recipeId: number | undefined;
let user: User;
let title: string;
let description: string;
let instructions: string;
let nutritionFacts: string;
let cookingTips: string;
let extraNotes: string;
let createdAt: Date;
let updatedAt: Date;
let tags: Tag[];

beforeEach(() => {
    user = new User({
        id: undefined,
        username: '@BobHope',
        firstName: 'Bob',
        lastName: 'Hope',
        email: 'bobhope@gmail.com',
        password: 'bob123',
        role: 'user',
    });
    tags = [new Tag({ name: 'Italian', description: 'Food from Italy', recipes: [] })];
    recipeId = undefined;
    title = 'spaghetti';
    description = 'A delicious spaghetti recipe.';
    instructions = '1. Boil water. 2. Cook pasta. 3. Prepare sauce. 4. Mix pasta and sauce.';
    nutritionFacts = 'Calories: 200, Protein: 7g, Carbs: 30g, Fat: 5g';
    cookingTips = 'Use fresh tomatoes for the sauce.';
    extraNotes = 'Can be stored in the fridge for up to 3 days.';
    createdAt = new Date('2023-01-01T00:00:00Z');
    updatedAt = new Date('2023-01-02T00:00:00Z');
});

test(`given: valid values for recipe, when: recipe is created, then: recipe is created with those values`, () => {
    // given
    // when
    const recipe = new Recipe({
        recipeId,
        user,
        title,
        description,
        instructions,
        nutritionFacts,
        cookingTips,
        extraNotes,
        createdAt,
        updatedAt,
        tags: [],
    });

    // then
    expect(recipe.getRecipeId()).toBe(recipeId);
    expect(recipe.getUser()).toEqual(user); 
    expect(recipe.getTitle()).toBe(title);
    expect(recipe.getDescription()).toBe(description);
    expect(recipe.getInstructions()).toBe(instructions);
    expect(recipe.getNutritionFacts()).toBe(nutritionFacts);
    expect(recipe.getCookingTips()).toBe(cookingTips);
    expect(recipe.getExtraNotes()).toBe(extraNotes);
    expect(recipe.getCreationDate()).toEqual(createdAt);
    expect(recipe.getUpdateAt()).toEqual(updatedAt);
});

test(`given: two equal recipe's, when: the recipe.equals method is called, then: the method will return true`, () => {
    //given
    const recipe = new Recipe({
        recipeId,
        user,
        title,
        description,
        instructions,
        nutritionFacts,
        cookingTips,
        extraNotes,
        createdAt,
        updatedAt,
        tags,
    });

    //when
    const isEqual = recipe.equals(recipe);

    //then
    expect(isEqual).toBe(true);
});

test(`given: two different recipe's ,when: the recipe.equals method is called, then: the method will return false`, () => {
    //given
    const recipe1 = new Recipe({
        recipeId,
        user,
        title,
        description,
        instructions,
        nutritionFacts,
        cookingTips,
        extraNotes,
        createdAt,
        updatedAt,
        tags,
    });

    const recipe2 = new Recipe({
        recipeId,
        user,
        title: 'DifferentTile',
        description,
        instructions,
        nutritionFacts,
        cookingTips,
        extraNotes,
        createdAt,
        updatedAt,
        tags,
    });

    //when
    const isEqual = recipe1.equals(recipe2);

    //then
    expect(isEqual).toBe(false);
});
