

import express, { NextFunction, Request, Response, response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types/index';





const userRouter = express.Router();


userRouter.post('/login',async (req: Request, res: Response, next: NextFunction) => {

    try {
        const userInput = <UserInput>req.body;
        const respone = await userService.authenticate(userInput);
        res.status(200).json({message: "Authentication succesful", ...respone});
    } catch (error) {
        next(error);
    }


})

userRouter.post('/signup',async (req:Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const user = await userService.createUser(userInput);
        res.status(200).json(user);
    } catch (error : any) {
        res.status(400).json({ message: error.message || 'An unexpected error occurred' });        
        next(error);
    }
})

export { userRouter };