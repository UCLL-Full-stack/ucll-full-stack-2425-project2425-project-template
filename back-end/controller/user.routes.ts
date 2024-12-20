import userService from "../service/user.service"
import express, { NextFunction, Request, Response, Router } from 'express';
import { ca } from 'date-fns/locale';
import next from "next";
import { UserInput } from "../types";

const userRouter = express.Router();


userRouter.get('/', async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ status: 'error' });
  }
})

userRouter.get('/id/:id', async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(Number(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ status: 'error' });
  }
})

userRouter.get('/email/:email', async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserByEmail({ email: String(req.params.email) });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ status: 'error' });
  }
})

userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userInput = <UserInput>req.body;
    const user = await userService.createUser(userInput);
    res.status(200).json(user);
  } catch (error) {
    // res.status(400).json({ status: "error", message: error.message });
    next(error);
  }
})


userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userInput: UserInput = req.body;
    const response = await userService.authenticate(userInput);
    res.status(200).json({ message: "Authentication successful", ...response });
  } catch (error) {
    next(error);
  }

})



export default userRouter;
