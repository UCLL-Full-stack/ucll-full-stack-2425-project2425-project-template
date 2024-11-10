import express, { Request, Response } from 'express';
import projectService from "../service/project.service"
import { ProjectInput } from "../types/index"; 

export const projectRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         # Add other properties here as per your requirements
 *     ProjectInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         # Add other properties here as needed for creating a project
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Retrieve a list of projects
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */
projectRouter.get('/', async (req: Request, res: Response) => {
    try {
        const projects = await projectService.getAllProjects();
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }
});

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectInput'
 *     responses:
 *       200:
 *         description: The created project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 */
projectRouter.post('/', async (req: Request, res: Response) => {
    try {
        const project = <ProjectInput>req.body;
        const result = await projectService.createProject(project); // Ensure the function is awaited
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }

    /**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Retrieve a project by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The project ID
 *     responses:
 *       200:
 *         description: A single project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 */
projectRouter.get('/:id', async (req: Request, res: Response) => {
    const project_Id = parseInt(req.params.id);
    if (isNaN(project_Id)) {
      return res.status(400).json({ status: 'error', errorMessage: 'Invalid project ID' });
    }
  
    try {
      const project = await projectService.getProjectById(project_Id);
      res.status(200).json(project);
    } catch (error) {
      res.status(404).json({ status: 'error', errorMessage: (error as Error).message });
    }
  });
  
});

export default projectRouter;