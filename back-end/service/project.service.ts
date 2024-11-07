import projectDB from "../repository/project.db";
import { Project } from "../model/project";
import { ProjectInput } from "../types";

const createProject = async ({ name, users = [], tasks = [] }: ProjectInput): Promise<Project> => {
    if (!name) {
        throw new Error("Project name is required");
    }

    // We need to handle optional params in createProject
    const project = await projectDB.createProject(name, undefined, undefined, undefined);

    if (!project) {
        throw new Error("Project creation failed");
    }

    // Return a Project instance mapped from the returned data
    return Project.from(project);
};

const getAllProjects = async (): Promise<Project[]> => {
    const projects = await projectDB.getAllProjects();

    if (!projects || projects.length === 0) {
        throw new Error("No projects found");
    }

    // Map the list of projects to instances of Project
    return projects.map(Project.from);
};

const getProjectByName = async (name: string): Promise<Project> => {
    const project = await projectDB.getProjectByName(name);

    if (!project) {
        throw new Error(`Project with name "${name}" doesn't exist`);
    }

    // Return a single Project instance mapped from the returned data
    return Project.from(project);
};

export default {
    createProject,
    getAllProjects,
    getProjectByName,
};
