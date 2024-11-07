import projectDb from "../repository/project.db";
import { Project } from "../model/project";
import { ProjectInput } from "../types";

let currentId = 1;

const createProject = async ({ name, users = [] }: ProjectInput): Promise<Project> => {
    if (!name) throw new Error("Project name is required");
    if (users.length === 0) throw new Error("At least one user is required");

    const existingProject = await projectDb.getProjectByName({ name });
    if (existingProject) throw new Error("Project with this name already exists");

    const project = new Project({
        project_Id: currentId++,
        name: name,
        users: users,
        tasks: []
    });

    return projectDb.createProject(project);
};

const getAllProjects = async (): Promise<Project[]> => projectDb.getAllProjects();

export default {
    createProject,
    getAllProjects,
};