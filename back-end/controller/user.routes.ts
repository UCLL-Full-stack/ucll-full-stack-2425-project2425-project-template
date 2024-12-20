import { Router } from "express";
import userService from "../service/user.service";
import { UpdateUserInput } from "../types";

const userRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: Unique identifier for the user
 *         username:
 *           type: string
 *           description: Username of the user
 *         globalName:
 *           type: string
 *           description: Global name of the user
 *         userAvatar:
 *           type: string
 *           description: URL of the user's avatar
 *         guildIds:
 *           type: array
 *           items:
 *             type: string
 *           description: List of guild IDs the user is part of
 *         boardIds:
 *           type: array
 *           items:
 *             type: string
 *           description: List of board IDs associated with the user
 *         taskIds:
 *           type: array
 *           items:
 *             type: string
 *           description: List of task IDs associated with the user
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: No users found
 */
userRouter.get("/", async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Retrieve a specific user by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
userRouter.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
userRouter.post("/", async (req, res) => {
    const { userId, username, globalName, userAvatar, guildIds = [] } = req.body;
    try {
        const user = await userService.addUser({ userId, username, globalName, userAvatar, guildIds });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});

/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     summary: Update a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 */
userRouter.put("/:userId", async (req, res) => {
    const { userId } = req.params;
    const { username, globalName, userAvatar, guildIds, boardIds, taskIds } = req.body;
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
        res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});

/**
 * @swagger
 * /api/users/{userId}/guilds:
 *   get:
 *     summary: Retrieve all guilds associated with a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of guilds associated with the user
 *       404:
 *         description: User or guilds not found
 */
userRouter.get("/:userId/guilds", async (req, res) => {
    const { userId } = req.params;
    try {
        const guilds = await userService.getUserGuilds(userId);
        res.status(200).json(guilds);
    } catch (error) {
        res.status(404).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});

/**
 * @swagger
 * /api/users/{userId}/guilds/{guildId}/kanban-permissions:
 *   get:
 *     summary: Retrieve kanban permissions for a user in a specific guild
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *       - in: path
 *         name: guildId
 *         required: true
 *         description: The ID of the guild
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kanban permissions retrieved successfully
 *       404:
 *         description: Permissions not found
 */
userRouter.get("/:userId/guilds/:guildId/kanban-permissions", async (req, res) => {
    const { userId, guildId } = req.params;
    try {
        const kanbanPermissions = await userService.getAllKanbanPermissionsForGuild(userId, guildId);
        res.status(200).json(kanbanPermissions);
    } catch (error) {
        res.status(404).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});

/**
 * @swagger
 * /api/users/{userId}/boards/{boardId}/kanban-permissions:
 *   get:
 *     summary: Retrieve kanban permissions for a user in a specific board
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *       - in: path
 *         name: boardId
 *         required: true
 *         description: The ID of the board
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kanban permissions retrieved successfully
 *       404:
 *         description: Permissions not found
 */
userRouter.get("/:userId/boards/:boardId/kanban-permissions", async (req, res) => {
    const { userId, boardId } = req.params;
    try {
        const kanbanPermissions = await userService.getAllKanbanPermissionsForBoard(userId, boardId);
        res.status(200).json(kanbanPermissions);
    } catch (error) {
        res.status(404).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});

export default userRouter;
