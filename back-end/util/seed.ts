// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { id } from 'date-fns/locale';
import { connect } from 'http2';

const prisma = new PrismaClient();

const main = async () => {
    // Delete existing data to avoid duplication on re-run
    await prisma.workoutExercise.deleteMany();
    await prisma.workout.deleteMany();
    await prisma.exercise.deleteMany();
    await prisma.user.deleteMany();

    // Create Users
    const user1 = await prisma.user.create({
        data: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: await bcrypt.hash('password123', 10),
        },
    });

    const user2 = await prisma.user.create({
        data: {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            password: await bcrypt.hash('password123', 10),
        },
    });

    // Create Exercises
    const squat = await prisma.exercise.create({
        data: {
            name: 'Squat',
            description: 'A basic squat exercise for leg strength.',
            videoLink: 'https://example.com/squat-video',
        },
    });

    const pushUp = await prisma.exercise.create({
        data: {
            name: 'Push-Up',
            description: 'A basic push-up exercise for upper body strength.',
            videoLink: 'https://example.com/pushup-video',
        },
    });

    const pullUp = await prisma.exercise.create({
        data: {
            name: 'Pull-Up',
            description: 'A pull-up exercise for back and arm strength.',
            videoLink: 'https://example.com/pullup-video',
        },
    });

    // Create Workouts
    const workout1 = await prisma.workout.create({
        data: {
            name: 'Leg Day',
            description: 'A workout focused on leg exercises.',
            user: {
                connect: {
                    id: user1.id,
                },
            },
        },
    });

    const workout2 = await prisma.workout.create({
        data: {
            name: 'Upper Body Strength',
            description: 'A workout focused on upper body exercises.',
            user: {
                connect: {
                    id: user2.id,
                },
            },
        },
    });

    // Create WorkoutExercises (linking Workouts with Exercises)
    await prisma.workoutExercise.create({
        data: {
            sets: 4,
            reps: 10,
            rpe: 7,
            restTime: 90,
            workout: {
                connect: {
                    id: workout1.id,
                },
            },
            exercise: {
                connect: {
                    id: squat.id,
                },
            },
        },
    });

    await prisma.workoutExercise.create({
        data: {
            sets: 3,
            reps: 15,
            rpe: 8,
            restTime: 60,
            workout: {
                connect: {
                    id: workout2.id,
                },
            },
            exercise: {
                connect: {
                    id: pushUp.id,
                },
            },
        },
    });

    await prisma.workoutExercise.create({
        data: {
            sets: 3,
            reps: 10,
            rpe: 8,
            restTime: 90,
            workout: {
                connect: {
                    id: workout2.id,
                },
            },
            exercise: {
                connect: {
                    id: pullUp.id,
                },
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
