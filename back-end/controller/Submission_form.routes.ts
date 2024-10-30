/**
 * @swagger
 *   components:
 *    schemas:
 *      SubmissionForm:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            title:
 *              type: string
 *              description: Submission form title.
 *            content:
 *              type: string
 *              description: Submission form content.
 *            user:
 *              $ref: '#/components/schemas/Gebruiker'
 *            race:
 *              $ref: '#/components/schemas/Race'
 */
import express, { NextFunction, Request, Response } from 'express';
import submissionFormService from '../service/submission_form.service';
import { SubmissionFormInput } from '../types';

const submissionFormRouter = express.Router();

/**
 * @swagger
 * /submission_forms:
 *   get:
 *     summary: Retrieve a list of all submission forms
 *     tags: [Submission_form]
 *     description: Retrieve a list of all submission forms.
 *     responses:
 *       200:
 *         description: A list of submission forms.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubmissionForm'
 */
submissionFormRouter.get('/', (req, res) => {
    try {
        const submissionForms = submissionFormService.getAllSubmissionForms();
        res.status(200).json(submissionForms);
    } catch (error) {
        const err = error as Error;
        res.status(404).json({ error: err.message });
    }
});

/**
 * @swagger
 * /submission_forms:
 *   post:
 *     summary: Create a new submission form
 *     tags: [Submission_form]
 *     description: Create a new submission form with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubmissionForm'
 *     responses:
 *       201:
 *         description: The created submission form.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubmissionForm'
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: Internal server error.
 */
submissionFormRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const submissionFormInput: SubmissionFormInput = req.body;
        const newSubmissionForm = submissionFormService.createSubmissionForm(submissionFormInput);
        res.status(201).json(newSubmissionForm);
    } catch (error) {
        const err = error as Error;
        if (err.message.includes('required')) {
            res.status(404).json({ error: err.message });
        } else {
            next(err);
        }
    }
});

export { submissionFormRouter };