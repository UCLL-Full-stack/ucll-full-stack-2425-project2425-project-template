import e, { Router } from "express";
import userService from "../service/user.service";

const userRouter = Router();

userRouter.get("/:userId", (req, res) => {
    const { userId } = req.params;
    try {
        const user = userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
        res.status(404).json({ error: error.message });
        } else {
        res.status(404).json({ error: "An unknown error occurred" });
        }
    }
});


export default userRouter;