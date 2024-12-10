import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.shoppingcart.deleteMany();
    await prisma.item.deleteMany();
    await prisma.user.deleteMany();
    await prisma.nutritionlabel.deleteMany();

    const nutritionlabels = await Promise.all([
        prisma.nutritionlabel.create({
            data: {
                id: 1,
                energy: 33,
                fat: 0.3,
                saturatedFats: 0.0,
                carbohydrates: 7.7,
                sugar: 7.7,
                protein: 0.8,
                salts: 0.0,
            },
        }),
    ]);

    const items = await Promise.all([
        prisma.item.create({
            data: {
                id: 0,
                name: 'Strawberry',
                price: 4.19,
                pathToImage:
                    'https://www.health.com/thmb/zvfL1rCWAPg3XzidfAqURuCmttk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Strawberries-c5f434e7729e47c5b32c0deaa029386c.jpg',
                category: 'fruits',
                nutritionlabel: { connect: { id: nutritionlabels[0].id } },
            },
        }),
        prisma.item.create({
            data: {
                id: 1,
                name: 'Kaki',
                price: 3.99,
                pathToImage:
                    'https://www.fruitsnacks.be/media/cache/strip/uploads/media/5d2dc27ab1968/food-1056646-1280.jpg',
                category: 'fruits',
            },
        }),
        prisma.item.create({
            data: {
                id: 2,
                name: 'Banana',
                price: 2.59,
                pathToImage:
                    'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/08/bananas-1354785_1920.jpg',
                category: 'fruits',
            },
        }),
        prisma.item.create({
            data: {
                id: 3,
                name: 'Kiwi',
                price: 1.39,
                pathToImage:
                    'https://www.health.com/thmb/YjD1m861zN2cGF4q9bbeu6now64=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Kiwi-a2e9888bfab6474f8d12d2ae0287b356.jpg',
                category: 'fruits',
            },
        }),
        prisma.item.create({
            data: {
                id: 4,
                name: 'Blueberries',
                price: 3.49,
                pathToImage:
                    'https://images.squarespace-cdn.com/content/v1/58ebe6632994ca71ba304549/1491938746710-RE9ICCSBHSDYRFNJU5WG/image-asset.jpeg',
                category: 'fruits',
            },
        }),
        prisma.item.create({
            data: {
                id: 5,
                name: 'Plum',
                price: 1.29,
                pathToImage:
                    'https://assets.idahopreferred.com/uploads/2023/09/07170427/Plums-scaled-1.jpg',
                category: 'fruits',
            },
        }),
        prisma.item.create({
            data: {
                id: 6,
                name: 'Dragonfruit',
                price: 4.99,
                pathToImage:
                    'https://gardenerspath.com/wp-content/uploads/2022/09/Best-Dragon-Fruit-Varieties-FB.jpg',
                category: 'fruits',
            },
        }),
        prisma.item.create({
            data: {
                id: 7,
                name: 'Coconut',
                price: 6.79,
                pathToImage:
                    'https://www.jiomart.com/images/product/original/590000086/big-coconut-1-pc-approx-350-g-600-g-product-images-o590000086-p590000086-0-202408070949.jpg?im=Resize=(420,420)',
                category: 'fruits',
            },
        }),
    ]);

    const users = await Promise.all([
        prisma.user.create({
            data: {
                id: 0,
                email: 'john.doe@mail.com',
                password: await bcrypt.hash('John123!', 12),
                role: 'user',
            },
        }),
        prisma.user.create({
            data: {
                id: 1,
                email: 'jane.doe@mail.com',
                password: await bcrypt.hash('Jane123!', 12),
                role: 'user',
            },
        }),
    ]);

    await Promise.all([
        prisma.shoppingcart.create({
            data: {
                id: 0,
                name: 'Shoppingcart 1',
                deliveryDate: new Date('2026-12-24'),
                items: { connect: [items[0]] },
                userId: 0,
            },
        }),
        prisma.shoppingcart.create({
            data: {
                id: 1,
                name: 'Shoppingcart 2',
                deliveryDate: new Date('2026-09-16'),
                items: { connect: [items[1]] },
                userId: 1,
            },
        }),
    ]);

    console.log('Seed data created successfully');
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
