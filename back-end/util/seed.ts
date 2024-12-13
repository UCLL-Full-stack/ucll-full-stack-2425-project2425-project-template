import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const prisma = new PrismaClient();

async function clearDatabase() {
    await prisma.coach.deleteMany();
    await prisma.player.deleteMany();
    await prisma.user.deleteMany();
    await prisma.team.deleteMany();
    await prisma.competition.deleteMany();
  }

const main = async () => {
    await clearDatabase();
    const hashedPassword1 = await bcrypt.hash("password123", 12);
    const user1 = await prisma.user.create({
        data: {
            name: "John Doe",
            email: "john.doe@example.com",
            password: hashedPassword1,
            role: "player",
        },
    });

    const hashedPassword2 = await bcrypt.hash("password123", 12);
    const user2 = await prisma.user.create({
        data: {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            password: hashedPassword2,
            role: "coach",
        },
    });

    const hashedPassword3 = await bcrypt.hash("password123", 12);
    const user3 = await prisma.user.create({
        data: {
            name: "Alice Johnson",
            email: "alice.johnson@example.com",
            password: hashedPassword3,
            role: "player",
        },
    });

    const hashedPassword4 = await bcrypt.hash("password123", 12);
    const user4 = await prisma.user.create({
        data: {
            name: "Bob Brown",
            email: "bob.brown@example.com",
            password: hashedPassword4,
            role: "coach",
        },
    });

    const hashedPassword5 = await bcrypt.hash("password123", 12);
    const user5 = await prisma.user.create({
        data: {
            name: "Robbe Kemps",
            email: "robbe.kemps@example.com",
            password: hashedPassword5,
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