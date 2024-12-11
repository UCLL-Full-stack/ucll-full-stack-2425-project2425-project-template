import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import eventService from '../service/event.service';
import { UserInput } from '../types';

const userRouter = express.Router();

//get all users
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ status: 'error' });
    }
});

userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createdUser = await userService.createUser(req.body as UserInput);
        res.status(201).json(createdUser);
    } catch (error){
        next(error);
    }
})

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const response = await userService.authentication(userInput);
        res.status(200).json({ message: 'Authentication successful', ... response});
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ message: "Incorrect username or password.", type: 'error'});
        } else {
            next(error);
        }
    }

})

export { userRouter };