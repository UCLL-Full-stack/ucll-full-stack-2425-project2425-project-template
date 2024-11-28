// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.competition.deleteMany();

    const NBA = await prisma.competition.create({
        data: {
            name: "NBA",
            teams: {
                create: [
                    { name: "Los Angeles Lakers" },
                    { name: "Golden State Warriors" },
                ],
            },
        },
    });

    const BNXTLeague = await prisma.competition.create({
        data: {
            name: "BNXT League",
            teams: {
                create: [
                    { name: "Leuven Bears" },
                    { name: "Antwerp Giants" },
                ],
            },
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