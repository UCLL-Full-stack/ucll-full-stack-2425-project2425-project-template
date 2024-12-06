import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import userService from '../service/user.service';
import { AuthenticationInput, UserInput } from '../types';

const userRouter = express.Router();

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        await userService.createUser(userInput);
        const response = await userService.authenicate(userInput);
        res.status(200).json({ message: 'Account made, login in', ...response });
    } catch (error) {
        next(error);
    }
});

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName, role, password } = <AuthenticationInput>req.body;
        const authenicated = await userService.authenicate({
            userName,
            role,
            password,
        });
        res.status(200).json({ message: 'Login successful', ...authenicated });
    } catch (error) {
        next(error);
    }
});

userRouter.post('/addCategory', async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
        next(error);
    }
});

export default userRouter;
