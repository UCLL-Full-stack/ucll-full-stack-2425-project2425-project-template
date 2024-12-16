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
 *         destinationAccountNumber:
 *           type: string
 *         sourceAccountNumber:
 *           type: string
 *         type:
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
 * /transaction/expenses/{accountNumber}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new expense
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
 *         description: The expense was successfully created
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
            const { destinationAccountNumber, ...expenseData } = req.body;
            const expense: TransactionInput = {
                ...expenseData,
                sourceAccountNumber: accountNumber,
                destinationAccountNumber,
            };
            const result = await transactionService.createExpense(expense);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
);

export { transactionRouter };
