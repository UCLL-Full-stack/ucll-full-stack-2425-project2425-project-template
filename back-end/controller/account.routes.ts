import express, { NextFunction, Request, Response } from 'express';
import { createAccount } from '../service/account.service';

const router = express.Router();

router.post('/accounts', async (req, res) => {
    try {
        const { bio, userId } = req.body;
        const account = await createAccount(bio, userId);
        res.status(201).json(account);
    } catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
});


export default router;
