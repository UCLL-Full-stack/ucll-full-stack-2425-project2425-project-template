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