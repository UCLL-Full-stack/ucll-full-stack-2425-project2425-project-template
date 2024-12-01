import { PrismaClient } from '@prisma/client';
import userService from '../service/user.service';
import playlistService from '../service/playlist.service';
import songService from '../service/song.service';

require('dotenv').config();

const prisma = new PrismaClient();

const main = async () => {
    await prisma.user.deleteMany();
    await prisma.playlist.deleteMany();
    await prisma.song.deleteMany();

    const user_admin = await userService.createUser({
        username: "admin12",
        password: "admin123",
        email: "admin@admin.be",
        role: "admin",
        firstName: "admin",
        lastName: "admin",
        playlists: [] 
    });

    const user_nikolai = await userService.createUser({
        username: "niko",
        password: "nikolai123",
        email: "Nikolai@ucll.be",
        role: "user",
        firstName: "Nikolai",
        lastName: "Lastname",
        playlists: [] 
    });
    const playlist_1 = await playlistService.createPlaylist({
        name: "playlist1",
        totalNumbers: 0,
    });

    const playlist_2 = await playlistService.createPlaylist({
        name: "playlist2",
        totalNumbers: 0,
    });
    const song1 = await songService.createSong({
        title: "song1",
        genre: "pop",
    });

    const song2 = await songService.createSong({
        title: "song2",
        genre: "rock",
    });

    console.log('Seeding completed!');
};

main()
