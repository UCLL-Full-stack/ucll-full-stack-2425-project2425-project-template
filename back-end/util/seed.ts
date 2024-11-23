import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const main = async () => {
    await prisma.car.deleteMany();


const teslaModelS = await prisma.car.create({
    data: {
        model: "Model S",
        brand: "Tesla",
        year: 2020,
        licensePlate: "ABC123",
        price: 80000,
    },
})

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