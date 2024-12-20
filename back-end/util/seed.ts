import { PrismaClient } from '@prisma/client';
import { Line } from '../model/line';
import { User } from '../model/user';
import { Player } from '../model/player';
import { World } from '../model/world';
import { Floor } from '../model/floor';
import { Position } from '../model/position';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const prisma = new PrismaClient();

async function main() {

    await prisma.$executeRawUnsafe('ALTER SEQUENCE "User_id_seq" RESTART WITH 1');
    await prisma.$executeRawUnsafe('ALTER SEQUENCE "Player_id_seq" RESTART WITH 1');
    await prisma.$executeRawUnsafe('ALTER SEQUENCE "World_id_seq" RESTART WITH 1');
    await prisma.$executeRawUnsafe('ALTER SEQUENCE "Floor_id_seq" RESTART WITH 1');
    await prisma.$executeRawUnsafe('ALTER SEQUENCE "Line_id_seq" RESTART WITH 1');
    await prisma.$executeRawUnsafe('ALTER SEQUENCE "Position_id_seq" RESTART WITH 1');

    await prisma.position.deleteMany();
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
            role: 'premiumUser',
            password: await bcrypt.hash('password0233', 12),
            birthday: new Date(2004, 2, 18),
            accountBirthday: new Date(2024, 9, 12),
        }),
        new User({
            name: 'Cedric',
            email: 'cedric@example.com',
            role: 'admin',
            password: await bcrypt.hash('password59600', 12),
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
            image: "ch1",
            user: users[0],
        }),
        new Player({
            name: 'Cedinvu',
            statistics: 'hp: 20, power: veel',
            class: 'JAS 39 Gripen',
            currency: 2389,
            image: "ch1",
            user: users[0],
        }),
        new Player({
            name: 'Cedinvu2',
            statistics: 'hp: 2000, power: -1',
            class: 'Impostor',
            currency: 100004,
            image: "ch3",
            user: users[1],
        }),
        new Player({
            name: 'usersiscool',
            statistics: 'hp: 100, power: 100',
            class: 'Warrior',
            currency: 1454,
            image: "ch2",
            user: users[0],
        }),
        new Player({
            name: 'MasterPieck',
            statistics: 'hp: 2000, power: 1500',
            class: 'Teacher',
            currency: 15474,
            image: "ch1",
            user: users[1],
        }),
    ];

    const floors = [
        new Floor({
            floornumber: 1,
        }),
        new Floor({
            floornumber: 2,
        }),
        new Floor({
            floornumber: 3,
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
                image: player.getImage(),
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


            const positions = floor.getPositions();
            if (!positions) break;
            // Create Positions
            for (const pos of positions) {
                await prisma.position.create({
                    data: {
                        x: pos.getX(),
                        y: pos.getY(),
                        type: pos.getType(),
                        active: pos.getActive(),
                        floor: { connect: { id: createdFloor.id } },
                        player: undefined,
                    },
                });
            }
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });