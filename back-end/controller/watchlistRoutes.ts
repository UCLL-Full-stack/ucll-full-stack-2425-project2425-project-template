import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient();
const router = Router();

const watchlistRouter = express.Router();

watchlistRouter.post('/watchlist', async (req, res) => {
  const { userId, movieId } = req.body;
  try {
    const existingEntry = await prisma.watchlist.findFirst({
      where: { userId, movieId },
    });

    if (existingEntry) {
      return res.status(400).json({ message: 'Movie already in watchlist' });
    }

    const watchlistEntry = await prisma.watchlist.create({
      data: {
        userId,
        movieId,
      },
    });

    res.status(200).json({ message: 'Movie added to watchlist', watchlistEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding movie to watchlist' });
  }
});

export default watchlistRouter;
