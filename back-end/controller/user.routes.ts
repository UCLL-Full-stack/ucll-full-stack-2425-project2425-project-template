

import express, {NextFunction, Request, Response} from 'express';
import playerService from '../service/player.service';
import { LogInput, UserInput } from '../types/types';
import userService from '../service/user.service';


const userRouter = express.Router();


userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
})

userRouter.post('/signup', async (req: Request, res: Response , next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const result = await userService.createUser(user);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});


userRouter.post('/login', async (req: Request , res: Response, next: NextFunction) => {
    try {
        const user = <LogInput>req.body;
        const response = await userService.authenticate(user);
        res.status(200).json({ message: 'User authenticated', ...response});
    } catch (error) {
        next(error);
    }
})



export { userRouter };