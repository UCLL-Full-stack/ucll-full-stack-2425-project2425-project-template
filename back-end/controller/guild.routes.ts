import { Router } from 'express';
import guildService from '../service/guild.service';

const guildRouter = Router();

// GET permissions for a specific guild
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

// Other guild-related routes...

export default guildRouter;
