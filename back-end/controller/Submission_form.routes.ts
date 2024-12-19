import express, { NextFunction, Request, Response } from 'express';
import { SubmissionInput } from '../types';
import submissionService from '../service/Submission.service';

const submissionRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     SubmissionForm:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         title:
 *           type: string
 *           description: Submission form title.
 *         content:
 *           type: string
 *           description: Submission form content.
 *         type:
 *           type: string
 *           description: Submission form type.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Submission form creation date.
 *         solvedAt:
 *           type: string
 *           format: date-time
 *           description: Submission form solved date.
 *         createdBy:
 *           type: number
 *           description: ID of the user who created the submission form.
 */

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
submissionRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const submissions = await submissionService.getAllSubmissions();
        res.status(200).json(submissions);
    } catch (error) {
        next(error);
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
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               type:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *               solvedAt:
 *                 type: string
 *                 format: date-time
 *               createdBy:
 *                 type: number
 *                 default: 1
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
submissionRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const submissionFormInput: SubmissionInput = req.body;
        submissionFormInput.createdAt = new Date(submissionFormInput.createdAt); // Convert to Date object
        if (submissionFormInput.solvedAt) {
            submissionFormInput.solvedAt = new Date(submissionFormInput.solvedAt); // Convert to Date object if present
        }
        const newSubmissionForm = await submissionService.createSubmission(submissionFormInput);
        res.status(201).json(newSubmissionForm);
    } catch (error) {
        const err = error as Error;
        if (err.message.includes('required')) {
            res.status(400).json({ error: err.message });
        } else {
            next(err);
        }
    }
});

/**
 * @swagger
 * /submission_forms/accept/{id}:
 *   post:
 *     summary: Accept a submission form by ID
 *     tags: [Submission_form]
 *     description: Accept a submission form by providing the submission form ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The submission form ID
 *     responses:
 *       200:
 *         description: Submission form accepted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubmissionForm'
 *       404:
 *         description: Submission form not found.
 *       500:
 *         description: Internal server error.
 */
submissionRouter.post('/accept/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const submissionFormId = parseInt(req.params.id);
        const acceptedSubmissionForm = submissionService.acceptSubmission(submissionFormId);
        res.status(200).json(acceptedSubmissionForm);
    } catch (error) {
        const err = error as Error;
        res.status(404).json({ error: err.message });
    }
});

/**
 * @swagger
 * /submission_forms/{id}:
 *   delete:
 *     summary: Delete a submission form by ID
 *     tags: [Submission_form]
 *     description: Delete a submission form by providing the submission form ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The submission form ID
 *     responses:
 *       204:
 *         description: Submission form deleted.
 *       404:
 *         description: Submission form not found.
 *       500:
 *         description: Internal server error.
 */

submissionRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const submissionFormId = parseInt(req.params.id);
        submissionService.deleteSubmission(submissionFormId);
        res.status(204).send();
    } catch (error) {
        const err = error as Error;
        res.status(404).json({ error: err.message });
    }
});

/**
 * @swagger
 * /submission_forms/createdBy/{userId}:
 *   get:
 *     summary: Retrieve all submission forms created by a specific user
 *     tags: [Submission_form]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user who created the submission forms
 *     responses:
 *       200:
 *         description: A list of submission forms created by the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubmissionForm'
 *       404:
 *         description: Submission forms not found.
 *       500:
 *         description: Internal server error.
 */

submissionRouter.get('/createdBy/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        const submissions = await submissionService.getSubmissionsByCreatedBy(userId);
        if (submissions) {
            res.status(200).json(submissions);
        } else {
            res.status(404).json({ message: 'Submission forms not found' });
        }
    } catch (error) {
        next(error);
    }
});


export { submissionRouter };