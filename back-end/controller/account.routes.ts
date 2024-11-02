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
 *         users:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               nationalRegisterNumber:
 *                 type: string
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
 *         transactions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Transaction'
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *         budgetgoals:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Budgetgoal'
 */
import express, { Request, Response } from 'express';
import accountService from '../service/account.service';
import userService from '../service/user.service';
import { AccountInput, UserInput } from '../types/index';

const accountRouter = express.Router();

/**
 * @swagger
 * /users/{nationalRegisterNumber}/accounts:
 *   post:
 *     summary: Create a new account
 *     parameters:
 *       - in: path
 *         name: nationalRegisterNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's national register number
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
 *         description: The account could not be created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 */
accountRouter.post('/:nationalRegisterNumber/accounts', (req: Request, res: Response) => {
    try {
        const { nationalRegisterNumber } = req.params;
        const account = <AccountInput>req.body;

        // Find the user by national register number
        const currentUser = userService.getUserByNationalRegisterNumber(nationalRegisterNumber);
        if (!currentUser) {
            throw new Error(
                `User with national register number ${nationalRegisterNumber} not found`
            );
        }
        const user: UserInput = currentUser;
        if (!currentUser) {
            throw new Error(
                `User with national register number ${nationalRegisterNumber} not found`
            );
        }

        const result = accountService.createAccount(account, currentUser);
        res.status(200).json(result);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', errorMessage });
    }
});

export { accountRouter };
