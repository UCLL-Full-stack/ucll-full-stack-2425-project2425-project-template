import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.badge.deleteMany();
    await prisma.gymBattle.deleteMany();
    await prisma.pokemon.deleteMany();
    await prisma.trainer.deleteMany({});
    await prisma.user.deleteMany();
    await prisma.stats.deleteMany();

    // Create stats for Pikachu and Charizard
    const pikachuStats = await prisma.stats.create({
        data: {
            hp: 40,
            attack: 74,
            defence: 50,
            specialAttack: 80,
            specialDefence: 64,
            speed: 80,
        },
    });

    const charizardStats = await prisma.stats.create({
        data: {
            hp: 200,
            attack: 150,
            defence: 120,
            specialAttack: 140,
            specialDefence: 140,
            speed: 60,
        },
    });

    // Create Users
    const userRed = await prisma.user.create({
        data: {
            firstName: "Red",
            lastName: 'pokemon',
            email: 'red@gmail.com',
            password: 'GonnaBeTheBest151',
            role: 'trainer',
        },
    });

    const userBlue = await prisma.user.create({
        data: {
            firstName: "Blue",
            lastName: 'pokemon',
            email: 'blue@gmail.com',
            password: 'Sm3llY4L4ter',
            role: 'trainer',
        },
    });

    // Create Trainers and associate them with Users
    const trainerRed = await prisma.trainer.create({
        data: {
            userId: userRed.id,  // Link to User Red
        },
    });

    const trainerBlue = await prisma.trainer.create({
        data: {
            userId: userBlue.id,  // Link to User Blue
        },
    });

    // Create Pokémon
    const pikachu = await prisma.pokemon.create({
        data: {
            name: "pikachu",
            type: "electric",
            health: 38,
            canEvolve: true,
            stats: {
                connect: { id: pikachuStats.id },  // Connect Pikachu stats
            },
            trainer: {
                connect: { id: trainerRed.id },  // Assign Pikachu to Trainer Red
            },
        },
    });

    const charizard = await prisma.pokemon.create({
        data: {
            name: "charizard",
            type: "fire/flying",
            health: 200,
            canEvolve: false,
            stats: {
                connect: { id: charizardStats.id },  // Connect Charizard stats
            },
            trainer: {
                connect: { id: trainerRed.id },  // Assign Charizard to Trainer Red
            },
        },
    });

    const rattata = await prisma.pokemon.create({
        data: {
            name: "rattata",
            type: "normal",
            health: 50,
            canEvolve: true,
            stats: {
                create: {  // Create stats for Rattata directly
                    hp: 50,
                    attack: 55,
                    defence: 40,
                    specialAttack: 30,
                    specialDefence: 24,
                    speed: 75,
                },
            },
            trainer: {
                connect: { id: trainerBlue.id },  // Assign Rattata to Trainer Blue
            },
        },
    });

    const blastoise = await prisma.pokemon.create({
        data: {
            name: "blastoise",
            type: "water",
            health: 250,
            canEvolve: false,
            stats: {
                create: {  // Create stats for Blastoise directly
                    hp: 250,
                    attack: 140,
                    defence: 130,
                    specialAttack: 100,
                    specialDefence: 150,
                    speed: 65,
                },
            },
            trainer: {
                connect: { id: trainerBlue.id },  // Assign Blastoise to Trainer Blue
            },
        },
    });

    // Create Badges
    const boulderBadge = await prisma.badge.create({
        data: {
            name: "Boulder badge",
            location: "Pewter city",
            difficulty: 1,
            trainer: {  // Link badge to Trainer Red
                connect: { id: trainerRed.id },
            },
        },
    });

    const cascadeBadge = await prisma.badge.create({
        data: {
            name: "Cascade badge",
            location: "Cerulean city",
            difficulty: 1.5,
            trainer: {  // Link badge to Trainer Blue
                connect: { id: trainerBlue.id },
            },
        },
        
    });

    // Assign Badges to Trainers
    await prisma.trainer.update({
        where: { id: trainerRed.id },
        data: {
            badges: {
                connect: { id: boulderBadge.id },  // Connect Boulder Badge to Red
            },
        },
    });

    await prisma.trainer.update({
        where: { id: trainerBlue.id },
        data: {
            badges: {
                connect: [{ id: boulderBadge.id }, { id: cascadeBadge.id }],  // Connect both badges to Blue
            },
        },
    });

    console.log('Seed data created successfully!');
};

main()
    .catch(e => {
        console.error(e);
        prisma.$disconnect();
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
