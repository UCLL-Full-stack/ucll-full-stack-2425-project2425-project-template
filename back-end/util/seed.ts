import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.playlist.deleteMany();
    await prisma.subscription.deleteMany();
    await prisma.user.deleteMany(); 
    await prisma.song.deleteMany();
    

    const user_admin = await prisma.user.create({
        data: {
            username: "admin",
            password: await bcrypt.hash('admin123', 12),
            email: "admin@admin.be",
            role: "admin",
            firstName: "admin",
            lastName: "admin",
            subscription: {
                create: {
                    type: 'premium',
                    startDate: new Date(),
                    duration: 'unlimited'
                }
            }
        }
    });

    console.log('User and subscription created!', user_admin);

    const user_nikolai = await prisma.user.create({
        data: {
            username: "niko",
            password: await bcrypt.hash('niko123', 12),
            email: "Nikolai@ucll.be",
            role: "user",
            firstName: "Nikolai",
            lastName: "Lastname",
            subscription: {
                create: {
                    type: 'basic',
                    startDate: new Date(),
                    duration: '356'
                }
            }

        }
    });

    const artist_ward = await prisma.user.create({
        data: {
            username: "ward",
            password: await bcrypt.hash('ward123', 12),
            email: "ward@ucll.be",
            role: "artist",
            firstName: "Ward",
            lastName: "Looyens",
            subscription: {
                create: {
                    type: 'premium',
                    startDate: new Date(),
                    duration: '356'
                }
            }

        }
    });

    const playlist_1 = await prisma.playlist.create({
        data: {
            name: "playlist1",
            totalNumbers: 0,
            user: {
                connect: { id: user_nikolai.id }
            }
        }
    });

    console.log('Seeding completed!');

    const playlist_2 = await prisma.playlist.create({
        data: {
            name: "playlist2",
            totalNumbers: 0,
            user: {
                connect: { id: artist_ward.id }
            }
        }
    });

console.log('Seeding completed!');
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
