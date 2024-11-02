// ---- Not Yet Used ----

import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service.ts';
import { UserSignupInput } from '../types/index.js';

const userRouter = express.Router();

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users.map((user) => user.toJSON()));
    } catch (error) {
        next(error);
    }
});

userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserById(Number(req.params.id));
        res.status(200).json(user.toJSON());
    } catch (error) {
        next(error);
    }
});

userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserSignupInput>req.body;
        const result = await userService.createUser(user);
        res.status(200).json(result.toJSON());
    } catch (error) {
        next(error);
    }
});

export { userRouter };
