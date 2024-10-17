import projectDb from "../domain/data-access/project.db";
import userDb from "../domain/data-access/user.db";
import { Project } from "../domain/model/project";
import { ProjectInput } from "../types";

const createProject = ({name}: ProjectInput): Project => {
    if (!name) {
        throw new Error("Project name is required");
    }

    const project = new Project({ name, users: [], tasks: [] });

    return projectDb.createProject(project);
}

const getAllProjects = async (): Promise<Project[]> => projectDb.getAllProjects();

export default {
    createProject,
    getAllProjects,
};