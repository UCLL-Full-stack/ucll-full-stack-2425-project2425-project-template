import express, { Request, Response } from 'express';
import { BoardService } from '../service/board.service';
import { User } from '../model/user';
import { Guild } from '../model/guild';

const router = express.Router();
const boardService = new BoardService();

// Middleware to validate board creation request
const validateBoardCreation = (req: Request, res: Response, next: express.NextFunction) => {
    const { boardName, guildId } = req.body;
    
    if (!boardName || typeof boardName !== 'string') {
        res.status(400).json({ error: 'Valid board name is required' });
        return;
    }
    
    if (!guildId || typeof guildId !== 'string') {
        res.status(400).json({ error: 'Valid guild ID is required' });
        return;
    }
    
    next();
};

// Create a new board
router.post('/', validateBoardCreation, async (req: Request, res: Response) => {
    try {
        const { boardName, guildId } = req.body;
        
        // TODO: Get actual user from authentication
        const user = new User('user-id', 'username', 'usertag', []);
        const guild = new Guild(guildId, 'Guild Name', [], [], []);

        const board = await boardService.createBoard(boardName, user, guild);
        
        res.status(201).json({
            message: 'Board created successfully',
            board: {
                id: board.getBoardId(),
                name: board.getBoardName(),
                columns: board.getColumns().map(col => ({
                    id: col.getColumnId(),
                    name: col.getColumnName()
                }))
            }
        });
    } catch (error) {
        if (error instanceof Error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
});

// Get boards for a guild
router.get('/guild/:guildId', async (req: Request, res: Response) => {
    try {
        const { guildId } = req.params;
        const boards = await boardService.getBoardsByGuild(guildId);
        
        res.json({
            boards: boards.map(board => ({
                id: board.getBoardId(),
                name: board.getBoardName(),
                columns: board.getColumns().map(col => ({
                    id: col.getColumnId(),
                    name: col.getColumnName()
                }))
            }))
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
});

export default router;