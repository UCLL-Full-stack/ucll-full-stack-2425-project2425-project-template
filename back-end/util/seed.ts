// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const prisma = new PrismaClient();

const main = async () => {
    await prisma.participant.deleteMany();
    await prisma.driver.deleteMany();
    await prisma.racecar.deleteMany();
    await prisma.participant.deleteMany();
    await prisma.crash.deleteMany();
    await prisma.race.deleteMany();
    await prisma.tempRace.deleteMany();
    await prisma.submission.deleteMany();
    await prisma.user.deleteMany();

    await prisma.user.create({
        data: {
            username: 'admin',
            password: await bcrypt.hash('Password1', 10),
            name: 'Ad',
            surname: 'Min',
            email: 'admin.company@mail.com',
            permission: "ADMIN",
            createdAt: new Date()
        },
    });

    await prisma.user.create({
        data: {
            username: 'user1',
            password: await bcrypt.hash('password', 10),
            name: 'Jonathan',
            surname: 'Surname',
            email: 'jonathan.surname@ucll.be',
            permission: "USER",
            createdAt: new Date()
        },
    });

    await prisma.user.create({
        data: {
            username: 'user2',
            password: await bcrypt.hash('password', 10),
            name: 'Zbigniew',
            surname: 'Surname',
            email: 'zbigniew.szypkowski@ucll.be',
            permission: "USER",
            createdAt: new Date()
        },
    });

    await prisma.user.create({
        data: {
            username: 'guest123',
            password: await bcrypt.hash('password123456', 10),
            name: 'Piotr',
            surname: 'Brzasczykiewiczkowski',
            email: 'piotr.brzaczykiewiczkowski@ucll.be',
            permission: "GUEST",
            createdAt: new Date()
        },
    });

    const user1 = await prisma.user.findUnique({
        where: { username: 'user1' }
    });
    if (!user1) {
        throw new Error('User with username "user1" not found');
    }

    const tempRace1 = await prisma.tempRace.create({
        data: {
            name: 'Temp Race 1',
            type: 'Formula 1',
            description: 'A temporary race for testing',
            location: 'Test Track 1',
            date: new Date('2023-06-15T00:00:00Z'),
        },
    });
    
    const tempRace2 = await prisma.tempRace.create({
        data: {
            name: 'Temp Race 2',
            type: 'Formula 1',
            description: 'Another temporary race for testing',
            location: 'Test Track 2',
            date: new Date('2023-07-20T00:00:00Z'),
        },
    });

    await prisma.submission.create({
        data: {
            title: 'First Submission',
            content: 'This is the first submission content.',
            type: 'Type1',
            createdAt: new Date(),
            user: {
                connect: { id: user1.id },
            },
            race: { 
                connect: { id: tempRace1.id }
            }
        },
    });
    
    await prisma.submission.create({
        data: {
            title: 'Second Submission',
            content: 'This is the second submission content.',
            type: 'Type2',
            createdAt: new Date(),
            user: {
                connect: { id: user1.id },
            },
            race: {
                connect: { id: tempRace2.id }
            }
        },
    });

    const driver1 = await prisma.driver.create({
        data: {
            name: 'Lewis',
            surname: 'Hamilton',
            birthdate: new Date('1985-01-07'),
            team: 'Mercedes',
            country: 'United Kingdom',
            description: 'A skilled driver',
        },
    });

    const driver2 = await prisma.driver.create({
        data: {
            name: 'Max',
            surname: 'Verstappen',
            birthdate: new Date('1997-09-30'),
            team: 'Red Bull',
            country: 'Netherlands',
            description: 'A competitive driver',
        },
    });

    const driver3 = await prisma.driver.create({
        data: {
            name: 'Sebastian',
            surname: 'Vettel',
            birthdate: new Date('1987-07-03'),
            team: 'Aston Martin',
            country: 'Germany',
            description: 'A four-time world champion',
        },
    });

    const driver4 = await prisma.driver.create({
        data: {
            name: 'Charles',
            surname: 'Leclerc',
            birthdate: new Date('1997-10-16'),
            team: 'Ferrari',
            country: 'Monaco',
            description: 'A young and talented driver',
        },
    });

    const driver5 = await prisma.driver.create({
        data: {
            name: 'Lando',
            surname: 'Norris',
            birthdate: new Date('1999-11-13'),
            team: 'McLaren',
            country: 'United Kingdom',
            description: 'A promising young driver',
        },
    });

    const racecar1 = await prisma.racecar.create({
        data: {
            name: 'Mercedes W12',
            type: 'Formula 1',
            brand: 'Mercedes',
            hp: 1000,
        },
    });

    const racecar2 = await prisma.racecar.create({
        data: {
            name: 'Red Bull RB16B',
            type: 'Formula 1',
            brand: 'Red Bull',
            hp: 1050,
        },
    });

    const racecar3 = await prisma.racecar.create({
        data: {
            name: 'Aston Martin AMR21',
            type: 'Formula 1',
            brand: 'Aston Martin',
            hp: 980,
        },
    });

    const racecar4 = await prisma.racecar.create({
        data: {
            name: 'Ferrari SF21',
            type: 'Formula 1',
            brand: 'Ferrari',
            hp: 1020,
        },
    });

    const racecar5 = await prisma.racecar.create({
        data: {
            name: 'McLaren MCL35M',
            type: 'Formula 1',
            brand: 'McLaren',
            hp: 990,
        },
    });

    const participant1 = await prisma.participant.create({
        data: {
            driverId: driver1.id,
            racecarId: racecar1.id,
        },
    });

    const participant2 = await prisma.participant.create({
        data: {
            driverId: driver2.id,
            racecarId: racecar2.id,
        },
    });

    const participant3 = await prisma.participant.create({
        data: {
            driverId: driver3.id,
            racecarId: racecar3.id,
        },
    });

    const participant4 = await prisma.participant.create({
        data: {
            driverId: driver4.id,
            racecarId: racecar4.id,
        },
    });

    const participant5 = await prisma.participant.create({
        data: {
            driverId: driver5.id,
            racecarId: racecar5.id,
        },
    });

    const crash1 = await prisma.crash.create({
        data: {
            type: 'Collision',
            description: 'Crash at turn 3',
            casualties: 2,
            deaths: 1,
            participants: {
                connect: [{ id: participant1.id }, { id: participant2.id }],
            },
        },
    });

    const crash2 = await prisma.crash.create({
        data: {
            type: 'Collision',
            description: 'Crash at turn 5',
            casualties: 3,
            deaths: 0,
            participants: {
                connect: [{ id: participant1.id }],
            },
        },
    });

    const crash3 = await prisma.crash.create({
        data: {
            type: 'Spin',
            description: 'Spin at turn 7',
            casualties: 0,
            deaths: 0,
            participants: {
                connect: [{ id: participant3.id }],
            },
        },
    });

    const crash4 = await prisma.crash.create({
        data: {
            type: 'Collision',
            description: 'Crash at turn 2',
            casualties: 1,
            deaths: 0,
            participants: {
                connect: [{ id: participant4.id }, { id: participant5.id }],
            },
        },
    });

    const crash5 = await prisma.crash.create({
        data: {
            type: 'Engine Failure',
            description: 'Engine failure at turn 10',
            casualties: 0,
            deaths: 0,
            participants: {
                connect: [{ id: participant2.id }],
            },
        },
    });

    await prisma.race.create({
        data: {
            name: 'Grand Prix Monaco',
            type: 'Formula 1',
            description: 'A high-speed race',
            location: 'Monaco',
            date: new Date('2023-05-28T00:00:00Z'),
            crashes: {
                connect: [{ id: crash1.id }, { id: crash2.id }],
            },
        },
    });

    await prisma.race.create({
        data: {
            name: 'Grand Prix Silverstone',
            type: 'Formula 1',
            description: 'A historic race',
            location: 'Silverstone',
            date: new Date('2023-07-09T00:00:00Z'),
            crashes: {
                connect: [{ id: crash3.id }, { id: crash4.id }],
            },
        },
    });

    await prisma.race.create({
        data: {
            name: 'Grand Prix Spa',
            type: 'Formula 1',
            description: 'A challenging race',
            location: 'Spa',
            date: new Date('2023-08-27T00:00:00Z'),
            crashes: {
                connect: [{ id: crash5.id }],
            },
        },
    });

    await prisma.race.create({
        data: {
            name: 'Grand Prix Monza',
            type: 'Formula 1',
            description: 'A fast race',
            location: 'Monza',
            date: new Date('2023-04-27T00:00:00Z'),
            crashes: {
                connect: [{ id: crash1.id }, { id: crash3.id }],
            },
        },
    });

    await prisma.race.create({
        data: {
            name: 'Grand Prix Suzuka',
            type: 'Formula 1',
            description: 'A technical race',
            location: 'Suzuka',
            date: new Date('2023-01-05T00:00:00Z'),
            crashes: {
                connect: [{ id: crash2.id }, { id: crash4.id }],
            },
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });