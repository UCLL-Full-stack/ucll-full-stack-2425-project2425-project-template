import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.shoppingcart.deleteMany();
    await prisma.review.deleteMany();
    await prisma.product.deleteMany();
    await prisma.cartItem.deleteMany();  

    const toyTrain = await prisma.product.create({
        data: {
            name: "Toy Train",
            price: 35.10,
            description: "A toy train from the ABD company suitable for children aged 5-12 years old.",
            stock: 10,
        },
    });

    const smartwatch = await prisma.product.create({
        data: {
            name: "Smartwatch",
            price: 199.99,
            description: "A sleek smartwatch with heart-rate monitoring and GPS tracking",
            stock: 15,
        },
    });

    const backpack = await prisma.product.create({
        data: {
            name: "Backpack",
            price: 49.99,
            description: "A durable backpack with multiple compartments and waterproof material",
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
            comment: "The toy broke after one use. Very disappointing.",
            date: new Date('2024-01-10'),
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
            score: 5,
            comment: "My kids love this toy train! Great quality and fun to play with.",
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

    const shoppingCart = await prisma.shoppingcart.create({
        data: {
            user: {
                connect: { id: user.id }, 
            },
        },
    });

    await prisma.cartItem.create({
        data: {
            product: {
                connect: { id: toyTrain.id },
            },
            cart: {
                connect: { id: shoppingCart.id },
            },
            quantity: 1,
        },
    });

    await prisma.cartItem.create({
        data: {
            product: {
                connect: { id: smartwatch.id },
            },
            cart: {
                connect: { id: shoppingCart.id },
            },
            quantity: 1,
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
