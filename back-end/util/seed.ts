import { PrismaClient } from '@prisma/client';
import { Line } from '../model/line';
import { User } from '../model/user';
import { Player } from '../model/player';
import { World } from '../model/world';
import { Floor } from '../model/floor';
import { Position } from '../model/position';

const prisma = new PrismaClient();

// Creating constants
const users = [
    new User({
        name: 'Alice',
        email: 'alice@example.com',
        password: 'password123',
        birthday: new Date(1990, 1, 1),
        accountBirthday: new Date(2020, 1, 1),
    }),
    new User({
        name: 'Xander',
        email: 'Xander@example.com',
        password: 'password0233',
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

    // Create Users
    let createdUsers = [];

    for (const user of users) {
        const createdUser = await prisma.user.create({
            data: {
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                birthday: user.getBirthday(),
                accountBirthday: user.getAccountBirthday(),
            },
        });
        createdUsers.push(createdUser);
    }

    // Create Players
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

    const playerpos = new Position({playerID: 1, x: 10, y: 10, type: "player", active: true})

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
                owner: { connect: { id: world.getOwner().getId(), name: world.getOwner().getName(), email: world.getOwner().getEmail() } },
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
            await prisma.position.create({
                data: {
                    x: playerpos.getX(),
                    y: playerpos.getY(),
                    type: playerpos.getType(),
                    active: playerpos.getActive(),
                    floor: { connect: { id: createdFloor.id } },
                    player: { connect: { id: 1 } },
                },
            });
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

// Create Lines
// Tile legend:
//      'x': wall
//      '@': player
//      ' ': open space
/*
const tiles = [
    ['x', ' ', ' ', '', 'x'],
    ['x', 'x', ' ', '', 'x'],
    ['x', 'x', '@', '', 'x'],
    ['x', 'x', ' ', '', 'x'],
    ['x', 'x', ' ', 'x', 'x'],
];

const lines = [
    new Line({
        tiles: tiles[0],
        lineNum: 1,
    }),
    new Line({
        tiles: tiles[1],
        lineNum: 2,
    }),
    new Line({
        tiles: tiles[2],
        lineNum: 3,
    }),
    new Line({
        tiles: tiles[3],
        lineNum: 4, 
    }),
    new Line({
        tiles: tiles[4],
        lineNum: 5,
    }),
];
*/

// // Execute: npx ts-node util/seed.ts

// import { PrismaClient } from '@prisma/client';
// import { Player } from '../model/player';
// import { User } from '../model/user';
// import { Line } from '../model/line';
// import { World } from '../model/world';
// import { Floor } from '../model/floor';

// const prisma = new PrismaClient();

// // Creating users
// const xander = new User({
//     name: 'Xander',
//     email: 'xander.dhondt@student.ucll.be',
//     password: '1234',
//     birthday: new Date(2004, 2, 18),
// });
// const users = new User({
//     name: 'users',
//     email: 'users.somethingiforgor@student.ucll.be',
//     password: '5678',
//     birthday: new Date(2004, 5, 17),
// });
// const johan = new User({
//     name: 'Johan',
//     email: 'johan.pieck@teacher.ucll.be',
//     password: '8080',
//     birthday: new Date(2000, 1, 1), // sorry johan I don't know your bday :(
// });
// const milan = new User({
//     name: 'Milan',
//     email: 'milan.storms@student.ucll.be',
//     password: '6969',
//     birthday: new Date(2005, 6, 11),
// });
// const dean = new User({
//     name: 'Dean',
//     email: 'dean.duraku@student.ucll.be',
//     password: '1984',
//     birthday: new Date(2005, 12, 1),
// });

// // Creating players
// const players = [
//     new Player({
//         id: 1,
//         name: 'Alnea Starholt',
//         statistics: 'hp: 10, power: 9000+',
//         class: 'Red Mage',
//         currency: 10000,
//         user: xander,
//     }),
//     new Player({
//         id: 2,
//         name: 'Cedinvu',
//         statistics: 'hp: 20, power: veel',
//         class: 'JAS 39 Gripen',
//         currency: 2389,
//         user: users,
//     }),
//     new Player({
//         id: 3,
//         name: 'Cedinvu2',
//         statistics: 'hp: 2000, power: -1',
//         class: 'Impostor',
//         currency: 100004,
//         user: users,
//     }),
//     new Player({
//         id: 4,
//         name: 'usersiscool',
//         statistics: 'hp: 100, power: 100',
//         class: 'Warrior',
//         currency: 1454,
//         user: users,
//     }),
//     new Player({
//         id: 5,
//         name: 'MasterPieck',
//         statistics: 'hp: 2000, power: 1500',
//         class: 'Teacher',
//         currency: 15474,
//         user: johan,
//     }),
//     new Player({
//         id: 6,
//         name: 'Storm',
//         statistics: 'hp: 50, power: 50',
//         class: 'Skier',
//         currency: 457532,
//         user: milan,
//     }),
//     new Player({
//         id: 7,
//         name: 'Wild',
//         statistics: 'hp: 87, power: 147',
//         class: 'Monkey',
//         currency: 0,
//         user: milan,
//     }),
//     new Player({
//         id: 8,
//         name: 'Epstein',
//         statistics: 'hp: 64, power: 455',
//         class: 'Bruh',
//         currency: 42453,
//         user: milan,
//     }),
//     new Player({
//         id: 9,
//         name: 'Deanbanaan1234',
//         statistics: 'hp: 37, power: 463',
//         class: 'Boxer',
//         currency: 9786,
//         user: dean,
//     }),
//     new Player({
//         id: 10,
//         name: 'Dracula',
//         statistics: 'hp: 2000, power: 5000',
//         class: 'Vampire',
//         currency: 69420,
//         user: dean,
//     }),
//     new Player({
//         id: 11,
//         name: 'Bean',
//         statistics: 'hp: 2, power: -1',
//         class: 'Beggar',
//         currency: 4,
//         user: dean,
//     }),
// ];

// // Creating a list of lines
// const lines = [
//     new Line({
//         tiles: ['x', ' ', ' ', ' ', 'x'],
//         lineNum: 1,
//     }),
//     new Line({
//         tiles: ['x', 'x', ' ', ' ', 'x'],
//         lineNum: 2,
//     }),
//     new Line({
//         tiles: ['x', ' ', '@', ' ', 'x'],
//         lineNum: 3,
//     }),
//     new Line({
//         tiles: ['x', ' ', ' ', 'x', 'x'],
//         lineNum: 4,
//     }),
// ];

// // Creating the floors
// const floors = [new Floor({ floornumber: 1, tiles: lines })];

// // Creating the world
// const world = new World({ name: 'world 1', owner: users, floors: floors });

// const main = async () => {
//     await prisma.player.deleteMany();
//     await prisma.user.deleteMany();
//     await prisma.line.deleteMany();
//     await prisma.floor.deleteMany();
//     await prisma.world.deleteMany();

//     // User seeding
//     await prisma.user.create({
//         data: {
//             name: xander.getName(),
//             email: xander.getEmail(),
//             password: xander.getPassword(),
//             birthday: xander.getBirthday(),
//         },
//     });
//     await prisma.user.create({
//         data: {
//             name: users.getName(),
//             email: users.getEmail(),
//             password: users.getPassword(),
//             birthday: users.getBirthday(),
//         },
//     });
//     await prisma.user.create({
//         data: {
//             name: johan.getName(),
//             email: johan.getEmail(),
//             password: johan.getPassword(),
//             birthday: johan.getBirthday(),
//         },
//     });
//     await prisma.user.create({
//         data: {
//             name: milan.getName(),
//             email: milan.getEmail(),
//             password: milan.getPassword(),
//             birthday: milan.getBirthday(),
//         },
//     });
//     await prisma.user.create({
//         data: {
//             name: dean.getName(),
//             email: dean.getEmail(),
//             password: dean.getPassword(),
//             birthday: dean.getBirthday(),
//         },
//     });

//     // Player seeding
//     for (const player of players) {
//         await prisma.player.create({
//             data: {
//                 name: player.getName(),
//                 statistics: player.getStatistics(),
//                 class: player.getClass(),
//                 currency: player.getCurrency(),
//                 user: {
//                     connect: { email: player.getUser().getEmail() },
//                 },
//             },
//         });
//     }

//     // Line seeding
//     const linePrisma = [];
//     for (const line of lines) {
//         const createdLine = await prisma.line.create({
//             data: {
//                 tiles: line.getTiles(),
//                 lineNum: line.getLineNum(),
//                 floor: {
//                     connect: { id: 1 }, // Assuming floor id is 1, adjust as necessary
//                 },
//             },
//         });
//         linePrisma.push(createdLine);
//     const floorPrisma: any[] = [];

//     // Floor seeding
//     const floorPrisma = [];
//     for (const floor of floors) {
//         const createdFloor = await prisma.floor.create({
//             data: {
//                 floornumber: floor.getFloornumber(),
//                 tiles: {
//                     connect: linePrisma.map((line) => ({ id: line.id })),
//                 },
//                 world: {
//                     connect: { id: worldPrisma.id },
//                 },
//             },
//         });
//         floorPrisma.push(createdFloor);
//     const worldPrisma: any = await prisma.world.create({

//     // World seeding
//     const worldPrisma = await prisma.world.create({
//         data: {
//             name: world.getName(),
//             owner: {
//                 connect: { email: world.getOwner().getEmail() },
//             },
//             floors: {
//                 connect: floorPrisma.map((floor) => ({ id: floor.id })),
//             },
//         },
//     });
// };

// main()
//     .catch((e) => {
//         console.error(e);
//         process.exit(1);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });
