import express, { Request, Response } from 'express';
import projectService from "../service/project.service"
import { ProjectInput } from "../types/index"; // Ensure the file exists at this path

const projectRouter = express.Router();

projectRouter.get('/', async (req: Request, res: Response) => {
    try {
        const projects = await projectService.getAllProjects();
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }
});

projectRouter.post('/', async (req: Request, res: Response) => {
    try {
        const project = <ProjectInput>req.body;
        const result =  projectService.createProject(project);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }
});