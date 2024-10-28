import { Router, Request, Response, NextFunction } from "express";
import userService from "../service/user.service";

const userRouter = Router()

userRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    try{
        const users = userService.getAllUsers()
        res.status(200).json(users)
    } catch (error: any) { 
        const errorMessage = error.message || "An unexpected error occurred";
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

userRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    try{
        const userid = parseInt(req.params.id)
        const user = userService.getUserById(userid)
        res.status(200).json(user)
    } catch (error: any) { 
        const errorMessage = error.message || "An unexpected error occurred";
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
    }
)

export default userRouter