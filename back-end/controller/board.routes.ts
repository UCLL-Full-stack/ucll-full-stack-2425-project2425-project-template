import { Router } from 'express';
import boardService from '../service/board.service';

const boardRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     DiscordPermission:
 *       type: string
 *       enum: [
 *         "View Channels", "Manage Channels", "Manage Roles",
 *         # ... (keeping your existing enum values)
 *       ]
 *     
 *     KanbanPermission:
 *       type: string
 *       enum: [
 *         "View Board", "Create Board", "Edit Board",
 *         # ... (keeping your existing enum values)
 *       ]
 *     
 *     Board:
 *       type: object
 *       properties:
 *         boardId:
 *           type: string
 *         boardName:
 *           type: string
 *         columnIds:
 *           type: array
 *           items:
 *             type: string
 *         permissions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PermissionEntry'
 */

/**
 * @swagger
 * /api/boards/guild/{guildId}:
 *   get:
 *     summary: Get all boards in a guild
 *     parameters:
 *       - in: path
 *         name: guildId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of boards
 *       400:
 *         description: Error getting boards
 */
boardRouter.get('/guild/:guildId', async (req, res) => {
    const { guildId } = req.params;
    try {
        const boards = await boardService.getBoardsOfGuild(guildId)
        res.status(200).json(boards);
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
 * /api/boards/{boardId}:
 *   get:
 *     summary: Get a board by ID
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Board details
 *       400:
 *         description: Error getting board
 */
boardRouter.get('/:boardId', async (req, res) => {
    const { boardId } = req.params;
    try {
        const board = await boardService.getBoardById(boardId);
        res.status(200).json(board);
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
 * /api/boards:
 *   post:
 *     summary: Create a new board
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Board'
 *     responses:
 *       201:
 *         description: Board created successfully
 *       400:
 *         description: Error creating board
 */
boardRouter.post('/', async (req, res) => {
    const board = req.body;
    try {
        await boardService.addBoard(board);
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
 * /api/boards/{boardId}/columns/reorder:
 *   put:
 *     summary: Reorder columns in a board
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               columnIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Columns reordered successfully
 *       400:
 *         description: Error reordering columns
 */
boardRouter.put('/:boardId/columns/reorder', async (req, res) => {
    const { boardId } = req.params;
    const { columnIds } = req.body;
    try {
        await boardService.updateBoard(boardId, { columnIds });
        res.status(200).json({ message: 'Columns reordered successfully' });
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
 * /api/boards/{boardId}:
 *   put:
 *     summary: Update a board
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Board'
 *     responses:
 *       200:
 *         description: Board updated successfully
 *       400:
 *         description: Error updating board
 */
boardRouter.put('/:boardId', async (req, res) => {
    const { boardId } = req.params;
    const board = req.body;
    try {
        await boardService.updateBoard(boardId, board);
        res.status(200).json({ message: 'Board updated successfully' });
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
 * /api/boards/{boardId}:
 *   delete:
 *     summary: Delete a board
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Board deleted successfully
 *       400:
 *         description: Error deleting board
 */
boardRouter.delete('/:boardId', async (req, res) => {
    const { boardId } = req.params;
    try {
        await boardService.deleteBoard(boardId);
        res.status(200).json({ message: 'Board deleted successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
});

export default boardRouter;