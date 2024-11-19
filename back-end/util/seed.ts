// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns'

const prisma = new PrismaClient();

const main = async () => {
    await prisma.admin.deleteMany();
    await prisma.user.deleteMany();

    const admin = await prisma.user.create({
        data: {
            username: 'admin1',
            password: 'Password1'
        },
    });

    const user = await prisma.user.create({
        data: {
            username: 'user',
            password: 'password'
        },
    });

    await prisma.admin.create({
        data: {
            username: 'admin',
            password: 'password'
        },
    });

    await prisma.user.create({
        data: {
            username: 'user1',
            password: 'Password1'
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