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

const admin = await prisma.user.create({
    data: {
        name: 'admin1',
        password: await bcrypt.hash('admin123', 12),
        email: 'admin@carshop.be',
        role: 'Admin',
    },
});

const manager = await prisma.user.create({
    data: {
        name: 'manager1',
        password: await bcrypt.hash('manager123', 12),
        email: 'manager@carshop.be',
        role: 'Manager',
    },
});

const salesman = await prisma.user.create({
    data: {
        name: 'salesman1',
        password: await bcrypt.hash('salesman123', 12),
        email: 'salesman@carshop.be',
        role: 'Salesman',
    },
});

const teslaModelSFrontBumper = await prisma.carPart.create({
    data: {
        name: "Tesla front Bumper",
        price: 1000,
        quantity: 5,
    },
})
const teslaModelSRearBumper = await prisma.carPart.create({
    data: {
        name: "Tesla rear Bumper",
        price: 500,
        quantity: 3,
    },
})
const teslaEngine = await prisma.carPart.create({
    data: {
        name: "Tesla Engine",
        price: 20000,
        quantity: 0,
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
