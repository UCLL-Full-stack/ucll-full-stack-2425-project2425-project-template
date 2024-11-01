/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Role:
 *       type: string
 *       enum: [admin, parent, child]
 *       description: The role of the user.
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: User name.
 *         email:
 *           type: string
 *           description: User email.
 *         password:
 *           type: string
 *           description: User Password
 *         role:
 *           $ref: '#/components/schemas/Role'
 *     Family:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Family name.
 *         familyList:
 *           type: Array
 *           items:
 *             $ref: '#/components/schemas/User'
 *           description: Family member list.
 *         owner:
 *           type: User
 *           description: The Person who created the family.
 */
import express, { NextFunction, Request, Response } from 'express';
import familyService from '../service/family.service';

const familyRouter = express.Router();

/**
 * @swagger
 * /families:
 *   get:
 *     summary: Get a list of all families.
 *     responses:
 *       200:
 *         description: An array of all families.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Family'
 */
familyRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const families = await familyService.getAllFamilies();
        res.status(200).json(families);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: "error", errorMessage: error.message });
        } else {
            res.status(400).json({ status: "error", errorMessage: "An unknown error occurred" });
        }
    }
});

export default familyRouter;