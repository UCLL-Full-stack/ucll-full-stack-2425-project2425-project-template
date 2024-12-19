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
  try{
    const user = await userService.getUserById(Number(req.params.id));
    res.status(200).json(user);
  }catch(error){
    if (error instanceof Error) {
      res.status(400).json({ status: 'error', message: error.message });
  } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ status: 'error', message: 'Unexpected error occurred' });
  }
  }
})

userRouter.post('/:userId/favourites', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { vehicleId } = req.body;
  try {
    const response = await userService.addFavouriteCar(Number(userId), vehicleId);
    res.status(201).json(response);
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ status: 'error', message: error.message });
  } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ status: 'error', message: 'Unexpected error occurred' });
  }
  }
});


// userRouter.post("/signup", async (req, res) => {
//   try {
//     const { email, name, password, phoneNumber } = req.body;
//     const token = await userService.signupUser( email, name, password, phoneNumber);
//     res.status(201).json({ message: "Signup successful", token });
//   } catch (error) {
//     res.status(400).json({message: "error" });
//   }
// });
  
  // Login route
  // userRouter.post("/login", async (req, res) => {
  //   try {
  //     const { email, password } = req.body;
  //     const user = users.find((u) => u.getEmail() === email);
  
  //     if (!user) {
  //       return res.status(404).json({ message: "User not found" });
  //     }
  
  //     const isPasswordValid = await user.validatePassword(password);
  //     if (!isPasswordValid) {
  //       return res.status(401).json({ message: "Invalid credentials" });
  //     }
  
  //     const token = generateToken({ id: user.getId(), email: user.getEmail() });
  //     res.status(200).json({ message: "Login successful", token });
  //   } catch (error) {
  //     res.status(500).json({ message: "Error logging in", error });
  //   }
  // });

  export default userRouter;
