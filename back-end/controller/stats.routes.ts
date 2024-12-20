import { NextFunction, Router } from "express";
import express, {Request, Response} from 'express';
import statsService from "../service/stats.service";
import { StatsInput } from "../types/types";
import { decodeJwtToken } from "../util/jwt";



const statsRouter = Router();


statsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email} = decodeJwtToken(token);
       const stats = await statsService.getAllStats({email});
        res.status(200).json(stats); 
    } catch (error) {
        next(error);
    }
});


statsRouter.post('/add/:id', async (req: Request, res: Response ,next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const id = parseInt(req.params.id);
        const stats = <StatsInput>req.body;
        const result = await statsService.addStatsToPlayer(id ,stats, {email, role});
        res.status(201).json(result);
    } catch (error) {
       next(error);
    }
});

statsRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const id = parseInt(req.params.id);
        const stats = <StatsInput>req.body;
        const result = await statsService.updateStats(id, stats, {email, role});
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

statsRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const id = parseInt(req.params.id);
        const result = await statsService.removeStats(id, {email, role});
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})


export { statsRouter };