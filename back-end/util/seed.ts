import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const main = async () => {
    const user1 = await prisma.user.create({
        data: {
            name: "John Doe",
            email: "john.doe@example.com",
            password: "password123",
            role: "player",
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            password: "password123",
            role: "coach",
        },
    });

    const user3 = await prisma.user.create({
        data: {
            name: "Alice Johnson",
            email: "alice.johnson@example.com",
            password: "password123",
            role: "player",
        },
    });

    const user4 = await prisma.user.create({
        data: {
            name: "Bob Brown",
            email: "bob.brown@example.com",
            password: "password123",
            role: "coach",
        },
    });

    const user5 = await prisma.user.create({
        data: {
            name: "Robbe Kemps",
            email: "robbe.kemps@example.com",
            password: "password123",
            role: "admin",
        },
    });

    const NBA = await prisma.competition.create({
        data: {
            name: "NBA",
            teams: {
                create: [
                    {
                        name: "Los Angeles Lakers",
                        players: {
                            create: [
                                {
                                    number: 23,
                                    user: {
                                        connect: { id: user1.id },
                                    },
                                },
                            ],
                        },
                        coaches: {
                            create: [
                                {
                                    user: {
                                        connect: { id: user2.id },
                                    },
                                },
                            ],
                        },
                    },
                    {
                        name: "Golden State Warriors",
                        players: {
                            create: [
                                {
                                    number: 30,
                                    user: {
                                        connect: { id: user3.id },
                                    },
                                },
                            ],
                        },
                        coaches: {
                            create: [
                                {
                                    user: {
                                        connect: { id: user4.id },
                                    },
                                },
                            ],
                        },
                    },
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