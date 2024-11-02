import { Router } from 'express';
import boardService from '../service/board.service';
import { validateBoard, validateColumn, validatePermissions } from '../util/validators';

const boardRouter = Router();

boardRouter.post('/',validateBoard, (req, res) => {
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

boardRouter.get('/guild/:guildId', (req, res) => {
    const { guildId } = req.params;
    const boards = boardService.getAllBoards().filter(board => board.getGuild().getGuildId() === guildId);
    res.status(200).json(boards);
});

boardRouter.get('/:boardId', (req, res) => {
    const { boardId } = req.params;
    const board = boardService.getBoard(boardId);
    if (board) {
        res.status(200).json(board);
    } else {
        res.status(404).json({ error: 'Board not found' });
    }
});

boardRouter.post('/:boardId/columns',validateColumn, (req, res) => {
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

boardRouter.post('/:boardId/permissions', validatePermissions, (req, res) => {
    const { boardId } = req.params;
    const permissions = req.body; // Expecting permissions in request body
    try {
        boardService.setPermissionsForBoard(boardId, permissions); // Implement this method in your service
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
