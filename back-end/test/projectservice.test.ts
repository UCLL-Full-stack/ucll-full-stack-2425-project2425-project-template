/* import projectDb from "../domain/data-access/project.db";
import { Project } from "../domain/model/project";
import projectService from "../service/project.service";

jest.mock("../domain/data-access/project.db");

describe('ProjectService', () => {
    let createProjectMock: jest.Mock;
    let getProjectByNameMock: jest.Mock;

    beforeEach(() => {
        createProjectMock = jest.fn();
        projectDb.createProject = createProjectMock;

        getProjectByNameMock = jest.fn();
        projectDb.getProjectByName = getProjectByNameMock;
    });

    it('should create a project successfully', async () => {
        const name = "New Project";
        const project = new Project({ name, users: [], tasks: [] });

        getProjectByNameMock.mockReturnValue(null);
        createProjectMock.mockReturnValue(project);

        const result = await projectService.createProject({ name });

        expect(getProjectByNameMock).toHaveBeenCalledTimes(1);
        expect(getProjectByNameMock).toHaveBeenCalledWith({ name });
        expect(createProjectMock).toHaveBeenCalledTimes(1);
        expect(createProjectMock).toHaveBeenCalledWith(project);
        expect(result).toEqual(project);
    });

    it('should throw an error if project name is missing', async () => {
        await expect(projectService.createProject({ name: "" })).rejects.toThrow("Project name is required");
    });

    it('should throw an error if project with the same name already exists', async () => {
        const name = "Existing Project";
        const existingProject = new Project({ name, users: [], tasks: [] });

        getProjectByNameMock.mockReturnValue(existingProject);

        await expect(projectService.createProject({ name })).rejects.toThrow("Project with this name already exists");
        expect(getProjectByNameMock).toHaveBeenCalledTimes(1);
        expect(getProjectByNameMock).toHaveBeenCalledWith({ name });
    });
}); */