import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/userService';

export const userRouter = express.Router();

userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction)=>{
    const id = Number(req.params["id"]);

    try{
        const user = await userService.getById(id);
        res.status(200).json(user);
    }catch(e){
        next(e); 
    }
});

userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction)=>{
    const user = req.body;
    try{
        const newUser = await userService.registerUser(user);
        res.status(200).json(newUser);
    }catch(e){
        next(e);
    }    
});

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = await userService.loginUser(req.body);
        res.status(200).json(user);
    }catch(e){
        next(e);
    }

});
