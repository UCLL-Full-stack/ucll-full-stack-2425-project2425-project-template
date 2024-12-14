// Execute: npx ts-node util/seed.ts
import { PrismaClient } from "@prisma/client";
import { Part } from "../model/part";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.build.deleteMany();
    await prisma.order.deleteMany();
    await prisma.part.deleteMany();
    await prisma.user.deleteMany();

    // USERS

    const user1 = await prisma.user.create({
        data: {
            name: 'Barack Obama',
            email: 'barack.obama@gmail.com',
            password: await bcrypt.hash('YesYouCan', 12),
            address: '1600 Pennsylvania Ave NW, Washington, DC',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: 'Neil Armstrong',
            email: 'neil.armstrong@nasamail.gov',
            password: await bcrypt.hash('OneSmallStep', 12),
            address: 'Apollo Blvd, Wapakoneta, OH'
        }
    });

    const user3 = await prisma.user.create({
        data: {
            name: 'Stephen Hawking',
            email: 'stephen.hawking@cambridge.ac.uk',
            password: await bcrypt.hash('BigBang42', 12),
            address: 'University of Cambridge, Cambridge, UK'
        }
    });



    // PARTS

    const part1 = await prisma.part.create({ data: { name: 'Ryzen 5600X', brand: 'AMD', type: 'CPU', price: 150 } });
    const part2 = await prisma.part.create({ data: { name: 'Ryzen 7600X', brand: 'AMD', type: 'CPU', price: 220 } });
    const part3 = await prisma.part.create({ data: { name: 'Ryzen 7800X', brand: 'AMD', type: 'CPU', price: 320 } });
    const part4 = await prisma.part.create({ data: { name: 'Ryzen 9800X', brand: 'AMD', type: 'CPU', price: 400 } });
    const part5 = await prisma.part.create({ data: { name: 'Core i7 14700K', brand: 'Intel', type: 'CPU', price: 400 } });
    const part6 = await prisma.part.create({ data: { name: 'Core Ultra 7 265K', brand: 'Intel', type: 'CPU', price: 400 } });

    const part7 = await prisma.part.create({ data: { name: 'Radeon RX 7800 XT', brand: 'AMD', type: 'GPU', price: 500 } });
    const part8 = await prisma.part.create({ data: { name: 'Radeon RX 7900 XTX', brand: 'AMD', type: 'GPU', price: 1000 } });
    const part9 = await prisma.part.create({ data: { name: 'Geforce RTX 4060', brand: 'Nvidia', type: 'GPU', price: 300 } });
    const part10 = await prisma.part.create({ data: { name: 'Geforce RTX 4090', brand: 'Nvidia', type: 'GPU', price: 1000 } });



    // BUILDS

    const build1 = await prisma.build.create({
        data: {
            price: 700,
            preBuild: true,
            parts: {
                connect: [{id: part1.id}, {id: part9.id}],
            },
        },
    });

    const build2 = await prisma.build.create({
        data: {
            price: 2050,
            preBuild: false,
            parts: {
                connect: [{id: part4.id}, {id: part8.id}],
            },
        },
    });



    // ORDERS
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
        console.log('Database seeded!');
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();