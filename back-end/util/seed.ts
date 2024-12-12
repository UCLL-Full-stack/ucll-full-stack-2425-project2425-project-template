//Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import { set } from 'date-fns';
// import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.user.deleteMany();
    await prisma.recipe.deleteMany();



    const jp = await prisma.user.create({
        data: {
            username: 'johanp',
            firstName: 'Johan',
            lastName: 'Pieck',
            email: 'johan.pieck@ucll.be',
            password: 'johanp123',
        },
    });

    await prisma.recipe.create({
        data: {
            title: 'spaghetti',
            description: 'A delicious spaghetti recipe.',
            instructions: '1. Boil water. 2. Cook pasta. 3. Prepare sauce. 4. Mix pasta and sauce.',
            nutritionFacts: 'Calories: 200, Protein: 7g, Carbs: 30g, Fat: 5g',
            cookingTips: 'Use fresh tomatoes for the sauce.',
            extraNotes: 'Can be stored in the fridge for up to 3 days.',
            createdAt: set(new Date(), { hours: 8, minutes: 30 }),
            updatedAt: set(new Date(), { hours: 8, minutes: 30 }),
            userId: jp.id, // Associate recipe with the user
        },
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


