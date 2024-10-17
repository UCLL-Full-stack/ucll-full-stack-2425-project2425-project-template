import projectDb from "../domain/data-access/project.db";
import { Project } from "../domain/model/project";

const createProject = async (project: Project): Promise<Project> => projectDb.createProject(project);

const getAllProjects = async (): Promise<Project[]> => projectDb.getAllProjects();

export default {
    createProject,
    getAllProjects,
};