import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.car.deleteMany();
    await prisma.carPart.deleteMany();
    await prisma.user.deleteMany();

    // car //

    const teslaModelS = await prisma.car.create({
        data: {
            model: 'Model S',
            brand: 'Tesla',
            year: 2020,
            licensePlate: 'ABC123',
            price: 80000,
        },
    });

const FordFocus = await prisma.car.create({
    data: {
        model: "Focus",
        brand: "Ford",
        year: 2019,
        licensePlate: "DEF456",
        price: 20000,
    },
})

const BMWX5 = await prisma.car.create({
    data: {
        model: "X5",
        brand: "BMW",
        year: 2021,
        licensePlate: "GHI789",
        price: 120000,
    },
})

const teslaModelSFrontBumper = await prisma.carPart.create({
    data: {
        name: "Front Bumper",
        price: 1000,
        quantity: 5,
    },
})
const teslaModelSRearBumper = await prisma.carPart.create({
    data: {
        name: "Rear Bumper",
        price: 500,
        quantity: 3,
    },
})
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
