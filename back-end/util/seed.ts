// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.profile.deleteMany();
    await prisma.recipeIngredient.deleteMany();
    await prisma.schedule.deleteMany();
    await prisma.ingredient.deleteMany();
    await prisma.recipe.deleteMany();
    await prisma.user.deleteMany();

    const user1 = await prisma.user.create({
        data: {
            username: 'annie',
            password: await bcrypt.hash('@NNie123', 12),
            role: 'admin',
            profile: {
                create: {
                    firstName: 'Anette',
                    lastName: 'Hardy',
                    email: 'annie@ucll.be',
                },
            },
        },
    });

    const user2 = await prisma.user.create({
        data: {
            username: 'shulin',
            password: await bcrypt.hash('Shul!n123', 12),
            role: 'user',
            profile: {
                create: {
                    firstName: 'Shulin',
                    lastName: 'Xu',
                    email: 'shulin@ucll.be',
                },
            },
        },
    });

    const user3 = await prisma.user.create({
        data: {
            username: 'amelie',
            password: await bcrypt.hash('h0tchOcol@te101', 12),
            role: 'guest',
            profile: {
                create: {
                    firstName: 'Amelie',
                    lastName: 'Lammens',
                    email: 'amelie@ucll.be',
                },
            },
        },
    });

    const schedule1 = await prisma.schedule.create({
        data: {
            userId: user1.id,
            createdAt: new Date(),
        },
    });

    const ingredients = await prisma.ingredient.createMany({
        data: [
            { name: 'Spaghetti', category: 'PANTRY' },
            { name: 'Tomato Sauce', category: 'PANTRY' },
            { name: 'Chicken Breast', category: 'MEAT_FISH' },
            { name: 'Lettuce', category: 'PRODUCE' },
            { name: 'Bread', category: 'PANTRY' },
            { name: 'Cheese', category: 'DAIRY_EGGS' },
            { name: 'Butter', category: 'DAIRY_EGGS' },
            { name: 'Apple', category: 'PRODUCE' },
            { name: 'Mixed Vegetables', category: 'PRODUCE' },
            { name: 'Soy Sauce', category: 'PANTRY' },
            { name: 'Flour', category: 'PANTRY' },
            { name: 'Sugar', category: 'PANTRY' },
            { name: 'Chocolate Chips', category: 'PANTRY' },
        ],
    });

    const ingredientIds = await prisma.ingredient.findMany();

    const recipe1 = await prisma.recipe.create({
        data: {
            title: 'Spaghetti Bolognese',
            instructions: 'Cook pasta, prepare sauce, mix together',
            cookingTime: 30,
            category: 'DINNER',
            userId: user1.id,
            scheduleId: schedule1.id,
            imageUrl:
                'https://images.unsplash.com/photo-1622973536968-3ead9e780960?auto=format&fit=crop&w=1170&q=80',
            isFavorite: true,
            scheduledDate: new Date('2024-12-03'),
        },
    });

    const recipe2 = await prisma.recipe.create({
        data: {
            title: 'Chicken Salad',
            instructions: 'Grill chicken, chop lettuce, mix together',
            cookingTime: 20,
            category: 'DINNER',
            userId: user1.id,
            scheduleId: schedule1.id,
            imageUrl:
                'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=687&q=80',
            isFavorite: false,
            scheduledDate: new Date('2024-12-05'),
        },
    });

    const recipe3 = await prisma.recipe.create({
        data: {
            title: 'Grilled Cheese Sandwich',
            instructions: 'Butter the bread, Place cheese between slices, Grill until golden brown',
            cookingTime: 10,
            category: 'LUNCH',
            userId: user1.id,
            scheduleId: schedule1.id,
            imageUrl:
                'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80',
            isFavorite: false,
            notes: 'For extra flavor, try adding some herbs or spices to the butter before spreading.',
            source: 'https://www.simplyrecipes.com/recipes/grilled_cheese_sandwich/',
            scheduledDate: new Date('2024-12-05'),
        },
    });

    const recipe4 = await prisma.recipe.create({
        data: {
            title: 'Apple Snack',
            instructions: 'Wash the apple and enjoy!',
            cookingTime: 1,
            category: 'SNACK',
            userId: user1.id,
            scheduleId: schedule1.id,
            imageUrl:
                'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            isFavorite: false,
            scheduledDate: new Date('2024-12-10'),
        },
    });

    const recipe5 = await prisma.recipe.create({
        data: {
            title: 'Vegetable Stir Fry',
            instructions:
                'Heat oil in a wok, add vegetables, stir fry for 5 minutes, add soy sauce, cook for 2 more minutes',
            cookingTime: 15,
            category: 'LUNCH',
            userId: user1.id,
            scheduleId: schedule1.id,
            imageUrl:
                'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
            isFavorite: false,
            scheduledDate: new Date('2024-12-10'),
        },
    });

    const recipe6 = await prisma.recipe.create({
        data: {
            title: 'Chocolate Chip Cookies',
            instructions:
                'Cream butter and sugar, add flour and chocolate chips, bake at 180°C for 10-12 minutes',
            cookingTime: 25,
            category: 'SNACK',
            userId: user1.id,
            scheduleId: schedule1.id,
            imageUrl:
                'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            isFavorite: false,
            scheduledDate: new Date('2024-12-10'),
        },
    });

    await prisma.recipeIngredient.createMany({
        data: [
            {
                recipeId: recipe1.id,
                ingredientId: ingredientIds.find((i) => i.name === 'Spaghetti')!.id,
                unit: 'g',
                quantity: 200,
            },
            {
                recipeId: recipe1.id,
                ingredientId: ingredientIds.find((i) => i.name === 'Tomato Sauce')!.id,
                unit: 'ml',
                quantity: 150,
            },
            {
                recipeId: recipe2.id,
                ingredientId: ingredientIds.find((i) => i.name === 'Chicken Breast')!.id,
                unit: 'g',
                quantity: 150,
            },
            {
                recipeId: recipe2.id,
                ingredientId: ingredientIds.find((i) => i.name === 'Lettuce')!.id,
                unit: 'g',
                quantity: 100,
            },
            {
                recipeId: recipe3.id,
                ingredientId: ingredientIds.find((i) => i.name === 'Bread')!.id,
                unit: 'slices',
                quantity: 2,
            },
            {
                recipeId: recipe3.id,
                ingredientId: ingredientIds.find((i) => i.name === 'Cheese')!.id,
                unit: 'g',
                quantity: 50,
            },
            {
                recipeId: recipe3.id,
                ingredientId: ingredientIds.find((i) => i.name === 'Butter')!.id,
                unit: 'g',
                quantity: 10,
            },
            {
                recipeId: recipe4.id,
                ingredientId: ingredientIds.find((i) => i.name === 'Apple')!.id,
                unit: 'piece',
                quantity: 1,
            },
            {
                recipeId: recipe5.id,
                ingredientId: ingredientIds.find((i) => i.name === 'Mixed Vegetables')!.id,
                unit: 'g',
                quantity: 300,
            },
            {
                recipeId: recipe5.id,
                ingredientId: ingredientIds.find((i) => i.name === 'Soy Sauce')!.id,
                unit: 'ml',
                quantity: 30,
            },
            {
                recipeId: recipe6.id,
                ingredientId: ingredientIds.find((i) => i.name === 'Butter')!.id,
                unit: 'g',
                quantity: 113,
            },
            {
                recipeId: recipe6.id,
                ingredientId: ingredientIds.find((i) => i.name === 'Flour')!.id,
                unit: 'g',
                quantity: 150,
            },
            {
                recipeId: recipe6.id,
                ingredientId: ingredientIds.find((i) => i.name === 'Sugar')!.id,
                unit: 'g',
                quantity: 100,
            },
            {
                recipeId: recipe6.id,
                ingredientId: ingredientIds.find((i) => i.name === 'Chocolate Chips')!.id,
                unit: 'g',
                quantity: 170,
            },
        ],
    });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
