/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         referenceNumber:
 *           type: string
 *         date:
 *           type: string
 *           format: date
 *         amount:
 *           type: number
 *         currency:
 *           type: string
 *         transactionType:
 *           type: string
 *         destinationAccountNumber:
 *           type: string
 *         sourceAccountNumber:
 *           type: string
 *     TransactionInput:
 *       type: object
 *       properties:
 *         amount:
 *           type: number
 *           format: int32
 *         currency:
 *           type: string
 *         destinationAccountNumber:
 *           type: string
 */

import express, { NextFunction, Request, Response } from 'express';
import transactionService from '../service/transaction.service';
import { TransactionInput } from '../types';

const transactionRouter = express.Router();

/**
 * @swagger
 * /transaction/{accountNumber}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new transaction
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The source account number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionInput'
 *     responses:
 *       200:
 *         description: The transaction was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
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
transactionRouter.post(
    '/:accountNumber',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { accountNumber } = req.params;
            const { destinationAccountNumber, ...transactionData } = req.body;
            const transaction: TransactionInput = {
                ...transactionData,
                sourceAccountNumber: accountNumber,
                destinationAccountNumber,
            };
            const result = await transactionService.createTransaction(transaction);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
);

export { transactionRouter };
