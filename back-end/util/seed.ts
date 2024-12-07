import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.user.deleteMany();
    await prisma.playlist.deleteMany();
    await prisma.song.deleteMany();

    const user_admin = await prisma.user.create({
        data:
        {        
            username: "admin12",
            password: await bcrypt.hash('admin123', 12),
            email: "admin@admin.be",
            role: "admin",
            firstName: "admin",
            lastName: "admin",
    }
    });

    const user_nikolai = await prisma.user.create({
        data :
        {        
            username: "niko",
            password: await bcrypt.hash('niko123', 12),
            email: "Nikolai@ucll.be",
            role: "user",
            firstName: "Nikolai",
            lastName: "Lastname",
    }
    });

    const playlist_1 = await prisma.playlist.create({
        data: 
        {
            name: "playlist1",
            totalNumbers: 0,
            user: {
                connect: {id: user_nikolai.id}
            }
        }
    });

    // const playlist_2 = await playlistService.createPlaylist({
    //     name: "playlist2",
    //     totalNumbers: 0,
    // });
    // const song1 = await songService.createSong({
    //     title: "song1",
    //     genre: "pop",
    // });

    // const song2 = await songService.createSong({
    //     title: "song2",
    //     genre: "rock",
    // });

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
