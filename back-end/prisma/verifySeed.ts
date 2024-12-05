import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifySeed() {
    const products = await prisma.product.findMany();
    console.log('Products in DB:', products);

    const users = await prisma.user.findMany();
    console.log('Users in DB:', users);
}

verifySeed()
    .catch((e) => {
        console.error(e);
    })
    .finally(() => {
        prisma.$disconnect();
    });
