import userService from "../service/user.service"
import express,{ Request, Response, Router } from 'express';
import { ca } from 'date-fns/locale';

const userRouter = express.Router();

// userRouter.get('/', async (req: Request, res: Response) => {
//     try {
//         const users = await userService.getAllUSers();
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(400).json({ status: 'error', errorMessage: error.message });
//     }
// });

