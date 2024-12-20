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
 *           description: The Kanban permissions associated with the identifier
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
 *           description: List of role IDs associated with the guild
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
 *                 description: Role IDs assigned to the member
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
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
guildRouter.get('/', async (req, res) => {
    try {
        const guilds = await guildService.getAllGuilds();
        res.status(200).json(guilds);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

/**
 * @swagger
 * /api/guilds/{guildId}:
 *   get:
 *     summary: Get a specific guild by ID
 *     parameters:
 *       - in: path
 *         name: guildId
 *         required: true
 *         description: The ID of the guild
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Guild retrieved successfully
 *       400:
 *         description: Bad request
 */
guildRouter.get('/:guildId', async (req, res) => {
    const { guildId } = req.params;
    try {
        const guild = await guildService.getGuildById(guildId);
        res.status(200).json(guild);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

/**
 * @swagger
 * /api/guilds:
 *   post:
 *     summary: Create a new guild
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Guild'
 *     responses:
 *       201:
 *         description: Guild created successfully
 *       400:
 *         description: Bad request
 */
guildRouter.post('/', async (req, res) => {
    const guild = req.body;
    try {
        await guildService.addGuild(guild);
        res.status(201).json({ message: 'Guild created successfully' });
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

/**
 * @swagger
 * /api/guilds/{guildId}:
 *   put:
 *     summary: Update a specific guild
 *     parameters:
 *       - in: path
 *         name: guildId
 *         required: true
 *         description: The ID of the guild to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Guild'
 *     responses:
 *       200:
 *         description: Guild updated successfully
 *       400:
 *         description: Bad request
 */
guildRouter.put('/:guildId', async (req, res) => {
    const { guildId } = req.params;
    const guild = req.body;
    try {
        await guildService.updateGuild(guildId, guild);
        res.status(200).json({ message: 'Guild updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

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
 *         description: Bad request
 */
guildRouter.get('/:guildId/permissions', async (req, res) => {
    const { guildId } = req.params;
    try {
        const permissions = await guildService.getGuildPermissions(guildId);
        res.status(200).json(permissions);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

/**
 * @swagger
 * /api/guilds/{guildId}/members:
 *   get:
 *     summary: Get all members of a specific guild
 *     parameters:
 *       - in: path
 *         name: guildId
 *         required: true
 *         description: The ID of the guild
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of members in the guild
 *       400:
 *         description: Bad request
 */
guildRouter.get('/:guildId/members', async (req, res) => {
    const { guildId } = req.params;
    try {
        const members = await guildService.getGuildMembers(guildId);
        res.status(200).json(members);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

/**
 * @swagger
 * /api/guilds/{guildId}/roles:
 *   get:
 *     summary: Get all roles for a specific guild
 *     parameters:
 *       - in: path
 *         name: guildId
 *         required: true
 *         description: The ID of the guild
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of roles in the guild
 *       400:
 *         description: Bad request
 */
guildRouter.get('/:guildId/roles', async (req, res) => {
    const { guildId } = req.params;
    try {
        const roles = await guildService.getGuildRoles(guildId);
        res.status(200).json(roles);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

export default guildRouter;
