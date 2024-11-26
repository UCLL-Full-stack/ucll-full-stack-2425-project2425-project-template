// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.race.deleteMany();
    await prisma.crash.deleteMany();
    await prisma.participant.deleteMany();
    await prisma.racecar.deleteMany();
    await prisma.driver.deleteMany();
    await prisma.submission.deleteMany();
    await prisma.user.deleteMany();

    await prisma.user.create({
        data: {
            username: 'admin',
            password: 'Password1',
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
            password: 'password',
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
            password: 'password',
            name: 'Zbigniew',
            surname: 'Surname',
            email: 'zbigniew.szypkowski@ucll.be',
            permission: "USER",
            createdAt: new Date()
        },
    });

    await prisma.user.create({
        data: {
            username: 'SigmaMale',
            password: 'SkibidiRizz2012',
            name: 'Piotr',
            surname: 'Brzasczykiewiczkowski',
            email: 'piotr.brzaczykiewiczkowski@ucll.be',
            permission: "GUEST",
            createdAt: new Date()
        },
    });

    await prisma.driver.create({
        data: {
            name: 'Lewis',
            surname: 'Hamilton',
            birthdate: new Date('1985-01-07'),
            team: 'Mercedes',
            country: 'United Kingdom',
            description: 'A skilled driver',
        },
    });

    await prisma.driver.create({
        data: {
            name: 'Max',
            surname: 'Verstappen',
            birthdate: new Date('1997-09-30'),
            team: 'Red Bull',
            country: 'Netherlands',
            description: 'A competitive driver',
        },
    });

    await prisma.racecar.create({
        data: {
            name: 'Mercedes W12',
            type: 'Formula 1',
            brand: 'Mercedes',
            hp: 1000
        },
    });

    await prisma.racecar.create({
        data: {
            name: 'Red Bull RB16B',
            type: 'Formula 1',
            brand: 'Red Bull',
            hp: 1050
        },
    });

    await prisma.participant.create({
        data: {
            driver: {
                connect: { id: 1 }
            },
            racecar: {
                connect: { id: 1 }
            }
        },
    });

    await prisma.participant.create({
        data: {
            driver: {
                connect: { id: 2 }
            },
            racecar: {
                connect: { id: 2 }
            }
        },
    });

    await prisma.race.create({
        data: {
            name: 'Grand Prix Monaco',
            type: 'Formula 1',
            description: 'A high-speed race',
            location: 'Monaco',
            date: new Date()
        },
    });

    await prisma.race.create({
        data: {
            name: 'Grand Prix Silverstone',
            type: 'Formula 1',
            description: 'A historic race',
            location: 'Silverstone',
            date: new Date()
        },
    });

    await prisma.crash.create({
        data: {
            type: "Collision",
            description: 'Crash at turn 3',
            casualties: 2,
            deaths: 1,
            race: {
                connect: { id: 1 }
            }
        },
    });

    await prisma.crash.create({
        data: {
            type: "Collision",
            description: 'Crash at turn 5',
            casualties: 3,
            deaths: 0,
            race: {
                connect: { id: 1 }
            }
        },
    });
    
    await prisma.submission.create({
        data: {
            title: 'Race Application 1',
            content: 'This is the first race application form.',
            type: 'Formula 1',
            isSolved: false,
            createdAt: new Date(),
            user: {
                connect: { id: 1 }
            }
        },
    });
    
    await prisma.submission.create({
        data: {
            title: 'Race Application 3',
            content: 'This is the third race application form.',
            type: 'Formula 1',
            isSolved: false,
            createdAt: new Date(),
            user: {
                connect: { id: 1 }
            }
        },
    });

    await prisma.submission.create({
        data: {
            title: 'Add max verstappen',
            content: 'he crashed at turn 3 on the 12th of may 2021. Some other info here',
            type: 'Crash',
            isSolved: true,
            createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
            solvedAt: new Date(),
            user: {
                connect: { id: 2 }
            }
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