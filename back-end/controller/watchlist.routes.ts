import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();

const watchlistRouter = express.Router();

watchlistRouter.post('/', async (req, res) => {
  const { userId, movieId } = req.body;
  
  try {
    const watchlistEntry = await prisma.watchlist.create({
      data: {
        user: { connect: { id: userId } }, 
        movie: { connect: { id: movieId } }, 
      },
    });

    res.status(200).json({ message: 'Movie added to watchlist', watchlistEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding movie to watchlist' });
  }
});

export { watchlistRouter };