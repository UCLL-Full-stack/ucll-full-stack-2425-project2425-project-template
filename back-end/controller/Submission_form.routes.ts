import express, { NextFunction, Request, Response } from 'express';
import submissionFormService from '../service/submission_form.service';
import { SubmissionFormInput } from '../types';

const submissionFormRouter = express.Router();

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
 *         user:
 *           $ref: '#/components/schemas/Gebruiker'
 *         race:
 *           $ref: '#/components/schemas/Race'
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

submissionFormRouter.post('/accept/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const submissionFormId = parseInt(req.params.id);
        const acceptedSubmissionForm = submissionFormService.acceptSubmissionForm(submissionFormId);
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

submissionFormRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const submissionFormId = parseInt(req.params.id);
        submissionFormService.deleteSubmissionForm(submissionFormId);
        res.status(204).send();
    } catch (error) {
        const err = error as Error;
        res.status(404).json({ error: err.message });
    }
});

export { submissionFormRouter };