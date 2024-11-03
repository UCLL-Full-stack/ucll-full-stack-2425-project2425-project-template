import { Router } from 'express';
import guildService from '../service/guild.service';

const guildRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PermissionEntry:
 *       type: object
 *       properties:
 *         identifier:
 *           type: string
 *           description: The ID or type of the permission entry (DiscordPermission or string)
 *         kanbanPermission:
 *           type: array
 *           items:
 *             type: string
 *             description: The Kanban permission associated with the identifier
 * 
 *     Guild:
 *       type: object
 *       properties:
 *         guildId:
 *           type: string
 *           description: Unique identifier for the guild
 *         guildName:
 *           type: string
 *           description: Name of the guild
 *         settings:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PermissionEntry'
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *             description: List of role IDs associated with the guild
 *         members:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID of the member
 *               roleIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Role IDs assigned to the member
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
 * /api/guilds/{guildId}/permissions:
 *   get:
 *     summary: Get permissions for a specific guild
 *     parameters:
 *       - in: path
 *         name: guildId
 *         required: true
 *         description: The ID of the guild to fetch permissions for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Permissions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PermissionEntry'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
guildRouter.get('/:guildId/permissions', (req, res) => {
    const { guildId } = req.params;
    try {
        const permissions = guildService.getGuildPermissions(guildId);
        res.status(200).json(permissions);
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
 * /api/guilds:
 *   get:
 *     summary: Get all guilds
 *     responses:
 *       200:
 *         description: A list of all guilds
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Guild'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
guildRouter.get('/', (req, res) => {
    try {
        const guilds = guildService.getAllGuilds();
        res.status(200).json(guilds);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }    
    }
});

export default guildRouter;
