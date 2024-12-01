import e, { Router } from "express";
import userService from "../service/user.service";
import { UpdateUserInput } from "../types";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        if (error instanceof Error) {
        res.status(404).json({ error: error.message });
        } else {
        res.status(404).json({ error: "An unknown error occurred" });
        }
    }
});

userRouter.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
        res.status(404).json({ error: error.message });
        } else {
        res.status(404).json({ error: "An unknown error occurred" });
        }
    }
});

userRouter.post("/", async (req, res) => {
    const { userId, username, globalName, userAvatar, guildIds = []} = req.body;
    try {
        const user = await userService.addUser({userId, username, globalName, userAvatar, guildIds});
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        } else {
        res.status(400).json({ error: "An unknown error occurred" });
        }
    }
});

userRouter.put("/:userId", async (req, res) => {
    const { userId } = req.params;
    const { username, globalName, userAvatar, guildIds, boardIds, taskIds} = req.body;
    const updateInput: UpdateUserInput = {};
    if (username !== undefined) updateInput.username = username;
    if (globalName !== undefined) updateInput.globalName = globalName;
    if (userAvatar !== undefined) updateInput.userAvatar = userAvatar;
    if (guildIds !== undefined) updateInput.guildIds = guildIds;
    if (boardIds !== undefined) updateInput.boardIds = boardIds;
    if (taskIds !== undefined) updateInput.taskIds = taskIds;
    try {
        const user = await userService.updateUser(userId, updateInput);
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        } else {
        res.status(400).json({ error: "An unknown error occurred" });
        }
    }
});

userRouter.get("/:userId/guilds", async (req, res) => {
    const { userId } = req.params;
    try {
        const guilds = await userService.getUserGuilds(userId);
        res.status(200).json(guilds);
    } catch (error) {
        if (error instanceof Error) {
        res.status(404).json({ error: error.message });
        } else {
        res.status(404).json({ error: "An unknown error occurred" });
        }
    }
});

userRouter.get("/:userId/guilds/:guildId/kanban-permissions", async (req, res) => {
    const { userId, guildId } = req.params;
    try {
        const kanbanPermissions = await userService.getAllKanbanPermissionsForGuild(userId, guildId);
        res.status(200).json(kanbanPermissions);
    } catch (error) {
        if (error instanceof Error) {
        res.status(404).json({ error: error.message });
        } else {
        res.status(404).json({ error: "An unknown error occurred" });
        }
    }
});


export default userRouter;