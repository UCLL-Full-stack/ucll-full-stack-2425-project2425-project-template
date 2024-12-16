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

userRouter.post("/signup", async (req, res) => {
    try {
      const { email, name, password, phoneNumber } = req.body;
      await newUser.hashPassword();
      users.push(newUser);
  
      const token = generateToken({ id: newUser.getId(), email: newUser.getEmail() });
      res.status(201).json({ message: "User created", token });
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  });
  
  // Login route
  userRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = users.find((u) => u.getEmail() === email);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isPasswordValid = await user.validatePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const token = generateToken({ id: user.getId(), email: user.getEmail() });
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  });

