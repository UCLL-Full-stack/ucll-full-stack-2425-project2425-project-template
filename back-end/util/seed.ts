import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.shoppingCart.deleteMany();
    await prisma.review.deleteMany();
    await prisma.product.deleteMany();

    const user1 = await prisma.user.create({
        data: {
            id: 1,
            username: 'user1',
            email: 'user1@gmail.com',
            password: 'user1',
        },
    });

    const toyTrain = await prisma.product.create({
        data: {
            id: 1,
            name: 'Toy Train',
            price: 35.1,
            description:
                'A toy train from the ABD company suitable for children aged 5-12 years old.',
            stock: 10,
        },
    });

    const smartwatch = await prisma.product.create({
        data: {
            id: 2,
            name: 'Smartwatch',
            price: 199.99,
            description: 'A sleek smartwatch with heart-rate monitoring and GPS tracking',
            stock: 15,
        },
    });

    const backpack = await prisma.product.create({
        data: {
            id: 3,
            name: 'Backpack',
            price: 49.99,
            description: 'A durable backpack with multiple compartments and waterproof material',
            stock: 25,
        },
    });

    const user = await prisma.user.create({
        data: {
            id: 1,
            username: 'milan',
            email: 'milan@mail.com',
            password: 'milanspassword', 
        },
    });

    
    await prisma.review.create({
        data: {
            score: 1,
            comment: 'The toy broke after one use. Very disappointing.',
            date: new Date('2024-01-10'),
            product: {
                connect: { id: toyTrain.id },
            },
            user: {
                connect: { id: user1.id },
            },
        },
    });
    
    await prisma.review.create({
        data: {
            score: 5,
            comment: 'My kids love this toy train! Great quality and fun to play with.',
            date: new Date('2024-01-15'),
            product: {
                connect: { id: toyTrain.id },
            },
            user: {
                connect: { id: user.id },
            },
        },
    });
    
    await prisma.review.create({
        data: {
            score: 4,
            comment: "This smartwatch is great, but a little pricey.",
            date: new Date('2024-01-12'),
            product: {
                connect: { id: smartwatch.id },
            },
            user: {
                connect: { id: user.id },
            },
        },
    });
    
    await prisma.review.create({
        data: {
            score: 3,
            comment: "Decent backpack, but I expected better durability.",
            date: new Date('2024-01-18'),
            product: {
                connect: { id: backpack.id },
            },
            user: {
                connect: { id: user.id },
            },
        },
    });

    const shoppingCart = await prisma.shoppingCart.create({
        data: {
            id: 1,
            userId: user.id,
            products: {
                connect: [{ id: toyTrain.id }, { id: smartwatch.id }],
            },
        },
    });



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
}
