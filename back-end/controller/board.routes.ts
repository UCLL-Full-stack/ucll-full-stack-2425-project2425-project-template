import { Router } from 'express';
import boardService from '../service/board.service';

const boardRouter = Router();

/**
 * @swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     DiscordPermission:
 *       type: string
 *       enum:
 *         - View Channels
 *         - Manage Channels
 *         - Manage Roles
 *         - Create Expressions
 *         - Manage Expressions
 *         - View Audit Log
 *         - View Server Insights
 *         - Manage Webhooks
 *         - Manage Server
 *         - Create Invite
 *         - Change Nickname
 *         - Manage Nicknames
 *         - Kick Members
 *         - Ban Members
 *         - Timeout Members
 *         - Send Messages
 *         - Send Messages in Threads
 *         - Create Public Threads
 *         - Create Private Threads
 *         - Embed Links
 *         - Attach Files
 *         - Add Reactions
 *         - Use External Emoji
 *         - Use External Stickers
 *         - Mention @everyone, @here, and All Roles
 *         - Manage Messages
 *         - Manage Threads
 *         - Send Text-to-Speech Messages
 *         - Send Voice Messages
 *         - Create Polls
 *         - Connect
 *         - Speak
 *         - Video
 *         - Use Soundboard
 *         - Use External Sounds
 *         - Use Voice Activity
 *         - Priority Speaker
 *         - Mute Members
 *         - Deafen Members
 *         - Move Members
 *         - Set Voice Channel Status
 *         - Use Application Commands
 *         - Use Activities
 *         - Use External Apps
 *         - Request to Speak
 *         - Create Events
 *         - Manage Events
 *         - Administrator
 * 
 *     KanbanPermission:
 *       type: string
 *       enum:
 *         - View Board
 *         - Create Board
 *         - Edit Board
 *         - Delete Board
 *         - Manage Board Permissions
 *         - Create Columns
 *         - Delete Columns
 *         - Edit Columns
 *         - Create Tasks
 *         - Edit Tasks
 *         - Delete Tasks
 *         - Assign Tasks
 *         - Change Task Status
 *         - Manage Task Assignees
 *         - View Activity Log
 *         - Administrator
 *
 *     PermissionEntry:
 *       type: object
 *       properties:
 *         identifier:
 *           oneOf:
 *             - type: string
 *             - $ref: '#/components/schemas/DiscordPermission'
 *         kanbanPermission:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/KanbanPermission'
 *
 *
 *     CreateBoardDTO:
 *       type: object
 *       properties:
 *         boardName:
 *           type: string
 *         createdByUser:
 *           oneOf:
 *             - type: string
 *             - type: object
 *               properties:
 *                 userId:
 *                   type: string
 *         guild:
 *           oneOf:
 *             - type: string
 *             - type: object
 *               properties:
 *                 guildId:
 *                   type: string
 *         columns:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               columnName:
 *                 type: string
 *         permissions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PermissionEntry'
 */

/**
 * @swagger
 * /api/boards:
 *   post:
 *     summary: Create a new board
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBoardDTO'
 *     responses:
 *       201:
 *         description: Board created successfully
 *       400:
 *         description: Invalid request
 */
boardRouter.post('/', (req, res) => {
    const board = req.body;
    try {
        boardService.createBoard(board);
        res.status(201).json({ message: 'Board created successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
});

/**
 * @swagger
 * /api/boards/guild/{guildId}:
 *   get:
 *     summary: Get all boards by guild ID
 *     parameters:
 *       - in: path
 *         name: guildId
 *         required: true
 *         description: The ID of the guild
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of boards for the specified guild
 *       404:
 *         description: Guild not found
 */
boardRouter.get('/guild/:guildId', (req, res) => {
    const { guildId } = req.params;
    const boards = boardService.getAllBoards().filter(board => board.getGuild().getGuildId() === guildId);
    res.status(200).json(boards);
});

/**
 * @swagger
 * /api/boards/{boardId}:
 *   get:
 *     summary: Get a specific board by ID
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         description: The ID of the board
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Board details
 *       404:
 *         description: Board not found
 */
boardRouter.get('/:boardId', (req, res) => {
    const { boardId } = req.params;
    const board = boardService.getBoard(boardId);
    if (board) {
        res.status(200).json(board);
    } else {
        res.status(404).json({ error: 'Board not found' });
    }
});

boardRouter.post('/:boardId/columns', (req, res) => {
    const { boardId } = req.params;
    const column = req.body;
    try {
        boardService.addColumnToBoard(boardId, column);
        res.status(201).json({ message: 'Column added successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }    
    }
});

boardRouter.post('/:boardId/permissions', (req, res) => {
    const { boardId } = req.params;
    const permissions = req.body;
    try {
        boardService.setPermissionsForBoard(boardId, permissions);
        res.status(200).json({ message: 'Permissions set successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }    
    }
});

export default boardRouter;
