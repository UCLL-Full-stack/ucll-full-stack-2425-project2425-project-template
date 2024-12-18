import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';


const prisma = new PrismaClient();

const main = async () => {
    await prisma.user.deleteMany({});
    await prisma.account.deleteMany({});

    const user1 = await prisma.user.create({
        data: {
            username: 'john_doe',
            email: 'john@example.com',
            password: await bcrypt.hash('password123', 12), 
        },
    });

    const user2 = await prisma.user.create({
        data: {
            username: 'jane_doe',
            email: 'jane@example.com',
            password: await bcrypt.hash('securepassword', 12),
        },
    });

    // Create accounts and link them to the created users
    const account1 = await prisma.account.create({
        data: {
            bio: 'Hi, I am an admin',
            user: {
                connect: { id: user1.id }, // Connect to user1
            },
        },
    });

    const account2 = await prisma.account.create({
        data: {
            bio: 'Hi, I am a user',
            user: {
                connect: { id: user2.id }, // Connect to user2
            },
        },
    });

    const movie1 = await prisma.movie.create({
        data: {
            title: 'Inception',
            poster: 'https://example.com/inception.jpg',
            director: 'Christopher Nolan', // Added required field
            genre: 'Sci-Fi', // Added required field
            description: 'A mind-bending thriller about dreams within dreams.', // Added required field
            duration: 148, // Added required field (duration in minutes)
            ageRating: 13, 
        },
      });
   
      const movie2 = await prisma.movie.create({
        data: {
            title: 'The Matrix',
            poster: 'https://example.com/matrix.jpg',
            director: 'The Wachowskis', // Added required field
            genre: 'Sci-Fi', // Added required field
            description: 'A computer hacker learns the truth about his reality and his role in the war against its controllers.', // Added required field
            duration: 136, // Added required field
            ageRating: 13, // Added required field
        },
      });
   
      // Seed Watchlist
      await prisma.watchlist.createMany({
        data: [
          { userId: user1.id, movieId: movie1.id },
         { userId: user1.id, movieId: movie2.id },
          { userId: user2.id, movieId: movie2.id },
        ],
      });
};


  
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