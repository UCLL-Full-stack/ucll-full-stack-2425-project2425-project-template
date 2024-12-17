

import express, { NextFunction, Request, Response, response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types/index';





const userRouter = express.Router();

userRouter.post('/signup',async (req:Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const user = await userService.createUser(userInput);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
})

export { userRouter };