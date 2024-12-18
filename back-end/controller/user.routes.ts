import userService from "../service/user.service"
import express,{ Request, Response, Router } from 'express';
import { ca } from 'date-fns/locale';
import next from "next";

const userRouter = express.Router();

userRouter.get('/', async (req: Request, res: Response) => {
  try{
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  }catch(error){
    res.status(400).json({status: 'error'});
  }
})

userRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({ status: 'error', message: 'Invalid user ID' });
    }

    const user = await userService.findUserById(userId);
    res.status(200).json(user);
  } catch(error){

    if (error instanceof Error) {
        res.status(400).json({ status: 'error', message: error.message });
    } else {
        console.error('Unexpected error:', error);
        res.status(500).json({ status: 'error', message: 'Unexpected error occurred' });
    }
}
});

userRouter.post('/:userId/favourites', async (req: Request, res: Response) => {
  
  const { userId } = req.params;
  const { vehicleId } = req.body;

  try {
    const response = await userService.addFavouriteCar(Number(userId), vehicleId);
    res.status(201).json(response);
  } catch(error){
    if (error instanceof Error) {
        res.status(400).json({ status: 'error', message: error.message });
    } else {
        console.error('Unexpected error:', error);
        res.status(500).json({ status: 'error', message: 'Unexpected error occurred' });
    }
}
});

userRouter.get('/:userId/favourites', async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const favourites = await userService.getFavouriteCars(Number(userId));
    res.status(200).json(favourites);
  } catch(error){

    if (error instanceof Error) {
        res.status(400).json({ status: 'error', message: error.message });
    } else {
        console.error('Unexpected error:', error);
        res.status(500).json({ status: 'error', message: 'Unexpected error occurred' });
    }
}
});

userRouter.delete('/:userId/favourites', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { vehicleId } = req.body;
  try {
    const response = await userService.removeFavouriteCar(Number(userId), vehicleId);
    res.status(200).json(response);
  } catch(error){

    if (error instanceof Error) {
        res.status(400).json({ status: 'error', message: error.message });
    } else {
        console.error('Unexpected error:', error);
        res.status(500).json({ status: 'error', message: 'Unexpected error occurred' });
    }
}
});

  export default userRouter;
