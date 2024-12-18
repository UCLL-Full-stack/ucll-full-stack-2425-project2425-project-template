import express, { NextFunction, Request, Response } from 'express';
import movieService from '../service/movie.service';

const movieRouter = express.Router();

movieRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movies = await movieService.getAllMovies();
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
});

export { movieRouter };