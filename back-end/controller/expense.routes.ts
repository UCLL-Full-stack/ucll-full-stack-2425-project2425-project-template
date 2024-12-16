/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Expense:
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
 *     ExpenseInput:
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
import expenseService from '../service/expense.service';
import { ExpenseInput } from '../types';

const expenseRouter = express.Router();

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
 *             $ref: '#/components/schemas/ExpenseInput'
 *     responses:
 *       200:
 *         description: The expense was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
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
expenseRouter.post('/:accountNumber', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { accountNumber } = req.params;
        const { destinationAccountNumber, ...expenseData } = req.body;
        const expense: ExpenseInput = {
            ...expenseData,
            sourceAccountNumber: accountNumber,
            destinationAccountNumber,
        };
        const result = await expenseService.createExpense(expense);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { expenseRouter };
