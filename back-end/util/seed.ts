import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';


const prisma = new PrismaClient();

const main = async () => {

    // await prisma.watchlist.deleteMany({});
    // await prisma.review.deleteMany({});
    // await prisma.movie.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.account.deleteMany({});


    const user1 = await prisma.user.create({
      data: {
        name: 'john_doe',
        email: 'john@example.com',
        password: 'password123', // Hash this in production!
      },
    });
  
    const user2 = await prisma.user.create({
      data: {
        name: 'jane_doe',
        email: 'jane@example.com',
        password: 'securepassword', // Hash this in production!
      },
    });

    const account1 = await prisma.account.create({
        data: {
          bio: 'Hi, I am an admin',
          userId: user1.id,
        },
    });
    
    const account2 = await prisma.account.create({
        data: {
          bio: 'Hi, I am a user',
          userId: user2.id,
        },
    });
};
  
//     // Seed Movies
//     const movie1 = await prisma.movie.create({
//       data: {
//         title: 'Inception',
//         poster: 'https://example.com/inception.jpg',
//       },
//     });
  
//     const movie2 = await prisma.movie.create({
//       data: {
//         title: 'The Matrix',
//         poster: 'https://example.com/matrix.jpg',
//       },
//     });
  
//     // Seed Watchlist
//     await prisma.watchlist.createMany({
//       data: [
//         { userId: user1.id, movieId: movie1.id },
//         { userId: user1.id, movieId: movie2.id },
//         { userId: user2.id, movieId: movie2.id },
//       ],
//     });
  
//     // Seed Reviews
//     await prisma.review.create({
//       data: {
//         userId: user1.id,
//         movieId: movie1.id,
//         text: 'Amazing movie with a mind-blowing plot!',
//         rating: 5,
//       },
//     });
  
//     await prisma.review.create({
//       data: {
//         userId: user2.id,
//         movieId: movie2.id,
//         text: 'A groundbreaking sci-fi classic.',
//         rating: 5,
//       },
//     });
//   }
  
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