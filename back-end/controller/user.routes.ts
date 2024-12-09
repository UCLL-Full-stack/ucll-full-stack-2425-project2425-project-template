

import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';


const userRouter = express.Router();

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

userRouter.get('/players', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const players = await userService.getAllPlayers();
        res.status(200).json(players);
    } catch (error) {
        next(error);
    }
});

userRouter.get('/coaches', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const coaches = await userService.getAllCoaches();
        res.status(200).json(coaches);
    } catch (error) {
        next(error);
    }
});

userRouter.get('/admins', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admins = await userService.getAllAdmins();
        res.status(200).json(admins);
    } catch (error) {
        next(error);
    }
});

userRouter.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

export {userRouter};