import { Tag } from '../../model/tags';
import { Recipe } from '../../model/recipe';
import { User } from '../../model/user';

let tagId: number | undefined;
let name: string;
let description: string;
let recipes: Recipe[];

beforeEach(() => {
    const user = new User({
        id: undefined,
        username: '@BobHope',
        firstName: 'Bob',
        lastName: 'Hope',
        email: 'bobhope@gmail.com',
        password: 'bob123',
        role: 'user',
    });
    const spaghetti = new Recipe({
        recipeId: undefined,
        user: user,
        title: 'Spaghetti Bolognese',
        description:
            'A classic Italian pasta dish made with a rich and savory meat sauce. Perfect for a hearty family dinner.',
        instructions: `
            1. Heat olive oil in a large pan over medium heat.
            2. Add chopped onions, carrots, and celery. Cook until softened.
            ....
        `,
        nutritionFacts: 'Calories: 450, Protein: 25g, Carbs: 50g, Fat: 15g',
        cookingTips:
            'For a richer flavor, let the sauce simmer for an additional 30 minutes. Use high-quality canned tomatoes for the best taste.',
        extraNotes:
            'This dish pairs well with a side of garlic bread and a green salad. Leftovers can be stored in the fridge for up to 3 days.',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        tags: []
    });
    const macaroni = new Recipe({
        recipeId: undefined,
        user: user,
        title: 'Macaroni and Cheese',
        description:
            "A creamy and cheesy pasta dish that's a favorite comfort food for many. Perfect for a quick and delicious meal.",
        instructions: `
            1. Cook macaroni according to package instructions until al done.
            2. In a separate pot, melt butter over medium heat.
            ....
        `,
        nutritionFacts: 'Calories: 500, Protein: 20g, Carbs: 60g, Fat: 20g',
        cookingTips:
            'For a crispy topping, sprinkle breadcrumbs over the macaroni and cheese and bake in the oven at 350°F for 15 minutes.',
        extraNotes:
            'This dish can be customized with additional ingredients like bacon, broccoli, or tomatoes. Leftovers can be stored in the fridge for up to 3 days.',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        tags: []
    });
    tagId = undefined;
    (name = 'Italian'), (description = 'Food linked to the Italian cuisine');
    recipes = [spaghetti, macaroni];
});

test(`given: valid values for user, when: user is created, then: user is created with those values`, () => {
    //given
    //when
    const tag = new Tag({ tagId, name, description, recipes });

    //then
    expect(tag.getTagId()).toBe(tagId);
    expect(tag.getName()).toBe(name);
    expect(tag.getDescription()).toBe(description);
    expect(tag.getRecipes()).toEqual(recipes);
});

test(`given: two equal tags, when: the tag.equals method is called, then: the method will return true`, () => {
    //given
    const tag = new Tag({ tagId, name, description, recipes });
    //when
    const isEqual = tag.equals(tag);

    //then
    expect(isEqual).toBe(true);
});

test(`given: two unequal tags, when: the tag.equals method is called, then: the method will return false`, () => {
    //given
    const tag1 = new Tag({ tagId, name, description, recipes });
    const tag2 = new Tag({ tagId, name: 'notEqualName', description, recipes });
    //when
    const isEqual = tag1.equals(tag2);

    //then
    expect(isEqual).toBe(false);
});
