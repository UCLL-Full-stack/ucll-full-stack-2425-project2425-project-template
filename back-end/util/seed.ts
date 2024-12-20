import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {

    await prisma.workout.deleteMany();
    await prisma.exercise.deleteMany();
    await prisma.user.deleteMany();


    const user1 = await prisma.user.create({
        data: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: await bcrypt.hash('password123', 10),
            role: 'admin',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            password: await bcrypt.hash('password123', 10),
            role: 'user',
        },
    });

    const trainer = await prisma.user.create({
        data: {
            firstName: 'Emily',
            lastName: 'Trainer',
            email: 'emily.trainer@example.com',
            password: await bcrypt.hash('password123', 10),
            role: 'trainer',
        },
    });


    const squat = await prisma.exercise.create({
        data: {
            name: 'Squat',
            description: 'A basic squat exercise for leg strength.',
            videoLink: 'https://example.com/squat-video',
            isFavorite: true,
        },
    });

    const pushUp = await prisma.exercise.create({
        data: {
            name: 'Push-Up',
            description: 'A basic push-up exercise for upper body strength.',
            videoLink: 'https://example.com/pushup-video',
            isFavorite: false,
        },
    });

    const pullUp = await prisma.exercise.create({
        data: {
            name: 'Pull-Up',
            description: 'A pull-up exercise for back and arm strength.',
            videoLink: 'https://example.com/pullup-video',
            isFavorite: true,
        },
    });

    await prisma.exercise.create({
        data: {
            name: 'Dips',
            description: 'A dips exercise for tricep strength.',
            videoLink: 'https://example.com/dips-video',
            isFavorite: false,
        },
    });

    await prisma.exercise.create({
        data: {
            name: 'Deadlift',
            description: 'A deadlift exercise for back strength.',
            videoLink: 'https://example.com/deadlift-video',
            isFavorite: true,
        },
    });


    await prisma.workout.create({
        data: {
            name: 'Arm Day',
            description: 'A workout focused on arm exercises.',
            user: {
                connect: {
                    id: user2.id,
                },
            },
            exercises: {
                connect: [{ id: pushUp.id }, { id: pullUp.id }, { id: squat.id }],
            },
        },
    });

    await prisma.workout.create({
        data: {
            name: 'Trainer Special',
            description: 'A special workout designed by the trainer.',
            user: {
                connect: {
                    id: trainer.id,
                },
            },
            exercises: {
                connect: [{ id: squat.id }, { id: pushUp.id }, { id: pullUp.id }],
            },
        },
    });

    console.log('Database has been seeded successfully.');
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