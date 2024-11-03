import UserService from "../service/User.service";
import { User } from "../model/User";
import express, { NextFunction, Request, Response } from "express"

const userRouter = express.Router()

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.getUserById(Number(req.params.id));
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

userRouter.get('/email/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.getUserByEmail(req.params.email);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

userRouter.get('/username/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.getUserByUsername(req.params.username);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body as User;
        const newUser = await UserService.createUser(user);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

export default userRouter;