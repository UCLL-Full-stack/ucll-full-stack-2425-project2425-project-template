/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     AccountInput:
 *       type: object
 *       properties:
 *         isShared:
 *           type: boolean
 *         type:
 *           type: string
 *     Account:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         accountNumber:
 *           type: string
 *         balance:
 *           type: number
 *         isShared:
 *           type: boolean
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         status:
 *           type: string
 *         type:
 *           type: string
 */
import express, { NextFunction, Request, Response } from 'express';
import accountService from '../service/account.service';
import { AccountInput } from '../types/index';

const accountRouter = express.Router();

/**
 * @swagger
 * /account:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AccountInput'
 *     responses:
 *       200:
 *         description: The account was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
accountRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const account = <AccountInput>req.body;
        const result = await accountService.createAccount(account);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /account/{id}:
 *   get:
 *     summary: Get account by id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           format: int64
 *           required: true
 *           description: The lecturer id.
 *     responses:
 *       200:
 *         description: JSON consisting of an account object
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Account'
 */
accountRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const account = await accountService.getAccountById({ id });
        res.status(200).json(account);
    } catch (error: any) {
        next(error);
    }
});
export { accountRouter };
