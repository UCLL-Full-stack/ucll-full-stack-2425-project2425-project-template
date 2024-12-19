import express, { NextFunction, Request, response, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';

const userRouter = express.Router();

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

userRouter.get('/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserByEmail(req.params.email);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const user = await userService.createUser(userInput);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authInput = <UserInput>req.body;
        const response = await userService.authenticate(authInput);
        res.status(200).json({ message: 'Login successful', ...response });
    } catch (error) {
        next(error);
    }
});

userRouter.put('update/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const updatedUser = await userService.updateUser(user);
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

export { userRouter };
