

import express, { NextFunction, Request, Response, response } from 'express';
import userService from '../service/user.service';
import { Role, UserInput } from '../types/index';





const userRouter = express.Router();


userRouter.get('/me', async (req: Request, res: Response, next: NextFunction) => {
    const request = req as Request & { auth: { email: string; role: Role } };
    const { email } = request.auth;

    try {
        const user = await userService.getUserByEmail(email);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }
});


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