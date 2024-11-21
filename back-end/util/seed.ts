// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns'

const prisma = new PrismaClient();

const main = async () => {
    await prisma.admin.deleteMany();
    await prisma.user.deleteMany();

    await prisma.admin.create({
        data: {
            username: 'admin',
            password: 'Password1'
        },
    });

    await prisma.user.create({
        data: {
            username: 'user1',
            password: 'password'
        },
    });

    await prisma.user.create({
        data: {
            username: 'user2',
            password: 'PASSWORD'
        },
    });

    await prisma.crash.create({
        data: {
            type: "Collision",
            description: 'Crash at turn 3',
            casualties: 2,
            deaths: 1,
        },
    });

    await prisma.crash.create({
        data: {
            type: "Collision",
            description: 'Crash at turn 5',
            casualties: 3,
            deaths: 0,
        },
    });

    await prisma.racecar.create({
        data: {
            car_name: 'Mercedes W12',
            type: 'Formula 1',
            description: 'A fast racecar',
            hp: 1000
        },
    });

    await prisma.racecar.create({
        data: {
            car_name: 'Red Bull RB16B',
            type: 'Formula 1',
            description: 'A powerful racecar',
            hp: 1050
        },
    });
}

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();