import { PrismaClient } from '@prisma/client';
import { Line } from '../model/line';
import { User } from '../model/user';
import { Player } from '../model/player';
import { World } from '../model/world';
import { Floor } from '../model/floor';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    await prisma.line.deleteMany();
    await prisma.floor.deleteMany();
    await prisma.world.deleteMany();
    await prisma.player.deleteMany();
    await prisma.user.deleteMany();

    // Creating constants
    const users = [
        new User({
            name: 'Alice',
            email: 'alice@example.com',
            role: 'user',
            password: await bcrypt.hash('password123', 12),
            birthday: new Date(1990, 1, 1),
            accountBirthday: new Date(2020, 1, 1),
        }),
        new User({
            name: 'Xander',
            email: 'alnea@example.com',
            role: 'user',
            password: await bcrypt.hash('password0233', 12),
            birthday: new Date(2004, 2, 18),
            accountBirthday: new Date(2024, 9, 12),
        }),
    ];

    const players = [
        new Player({
            name: 'Player1',
            statistics: 'Stats1',
            class: 'Warrior',
            currency: 100,
            user: users[0],
        }),
        new Player({
            name: 'Cedinvu',
            statistics: 'hp: 20, power: veel',
            class: 'JAS 39 Gripen',
            currency: 2389,
            user: users[0],
        }),
        new Player({
            name: 'Cedinvu2',
            statistics: 'hp: 2000, power: -1',
            class: 'Impostor',
            currency: 100004,
            user: users[1],
        }),
        new Player({
            name: 'usersiscool',
            statistics: 'hp: 100, power: 100',
            class: 'Warrior',
            currency: 1454,
            user: users[0],
        }),
        new Player({
            name: 'MasterPieck',
            statistics: 'hp: 2000, power: 1500',
            class: 'Teacher',
            currency: 15474,
            user: users[1],
        }),
    ];

    const floors = [
        new Floor({
            floornumber: 1,
        }),
    ];

    const worlds = [
        new World({
            id: 1,
            name: 'Eorzea',
            owner: users[0],
            floors: floors,
        }),
    ];
    // Create Users
    let createdUsers = [];

    for (const user of users) {
        const createdUser = await prisma.user.create({
            data: {
                name: user.getName(),
                email: user.getEmail(),
                role: user.getRole(),
                password: user.getPassword(),
                birthday: user.getBirthday(),
                accountBirthday: user.getAccountBirthday(),
            },
        });
        createdUsers.push(createdUser);
    }

    for (const player of players) {
        await prisma.player.create({
            data: {
                name: player.getName(),
                statistics: player.getStatistics(),
                class: player.getClass(),
                currency: player.getCurrency(),
                userId: createdUsers[0].id,
            },
        });
    }

    // Create Worlds
    for (const world of worlds) {
        const createdWorld = await prisma.world.create({
            data: {
                name: world.getName(),
                owner: {
                    connect: {
                        id: world.getOwner().getId(),
                        name: world.getOwner().getName(),
                        email: world.getOwner().getEmail(),
                    },
                },
            },
        });
        for (const floor of floors) {
            const createdFloor = await prisma.floor.create({
                data: {
                    floornumber: floor.getFloornumber(),
                    world: { connect: { id: createdWorld.id } },
                },
            });

            const tiles = floor.getTiles();
            if (!tiles) break;
            // Create lines
            for (const line of tiles) {
                await prisma.line.create({
                    data: {
                        tiles: line.getTiles(),
                        lineNum: line.getLineNum(),
                        floor: { connect: { id: createdFloor.id } },
                    },
                });
            }
        }
    }

    // Create Floors
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
