import express from 'express';
import { PlayerInput } from '../types';
import playerService from '../service/player.service';

const playerRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       required:
 *         - name
 *         - teamId
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the player
 *         name:
 *           type: string
 *           description: The name of the player
 *         teamId:
 *           type: integer
 *           description: The id of the team the player belongs to
 *       example:
 *         id: 1
 *         name: John Doe
 *         teamId: 1
 */

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: The players managing API
 */

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Returns the list of all the players
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: The list of the players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 */
playerRouter.get('/', async (_req, res) => {
    try {
        const players = await playerService.getAllPlayers();
        res.json(players);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /players:
 *   post:
 *     summary: Create a new player
 *     tags: [Players]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       200:
 *         description: The player was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       500:
 *         description: Some server error
 */
playerRouter.post('/', async (req, res) => {
    try {
        const player = req.body as PlayerInput;
        const newPlayer = await playerService.addPlayer(player);
        res.json(newPlayer);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default playerRouter;