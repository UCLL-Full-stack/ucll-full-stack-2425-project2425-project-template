// import projectService from "../service/project.service";
// import projectDB from "../repository/project.db"; // This is your dependency
// import { Project } from "../model/project";
// import { ProjectInput } from "../types";

// // Mock projectDB methods
// jest.mock("../repository/project.db");

// describe("Project Service", () => {

//     afterEach(() => {
//         jest.clearAllMocks();  // Clear mock calls after each test
//     });

//     test("should create a project successfully", async () => {
//         const projectData: ProjectInput = {
//             name: "Test Project",
//             users: [],  // Optional if empty
//             tasks: []    // Optional if empty
//         };

//         // Mock the DB layer to return a fake project
//         const mockProject = {
//             project_Id: 1,
//             name: "Test Project",
//             users: [],
//             tasks: []
//         };

//         // Mock the `createProject` method in projectDB to return the mock project
//         (projectDB.createProject as jest.Mock).mockResolvedValue(mockProject);

//         const createdProject = await projectService.createProject(projectData);

//         // Assert that the returned project is an instance of Project and has correct properties
//         expect(createdProject).toBeInstanceOf(Project);
//         expect(createdProject.getName()).toBe("Test Project");
//         expect(createdProject.getProjectId()).toBe(1);
//     });

//     test("should throw an error if project name is missing", async () => {
//         const projectData: ProjectInput = {
//             name: "",
//             users: [],
//             tasks: []
//         };

//         await expect(projectService.createProject(projectData)).rejects.toThrow("Project name is required");
//     });

//     test("should get all projects successfully", async () => {
//         const mockProjects = [
//             { project_Id: 1, name: "Test Project 1", users: [], tasks: [] },
//             { project_Id: 2, name: "Test Project 2", users: [], tasks: [] }
//         ];

//         // Mock the `getAllProjects` method in projectDB to return the mock projects
//         (projectDB.getAllProjects as jest.Mock).mockResolvedValue(mockProjects);

//         const projects = await projectService.getAllProjects();

//         // Assert the correct number of projects are returned
//         expect(projects.length).toBe(2);
//         expect(projects[0].getName()).toBe("Test Project 1");
//     });

//     test("should throw an error if no projects are found", async () => {
//         // Mock the `getAllProjects` method in projectDB to return an empty array
//         (projectDB.getAllProjects as jest.Mock).mockResolvedValue([]);

//         await expect(projectService.getAllProjects()).rejects.toThrow("No projects found");
//     });

//     test("should get a project by name", async () => {
//         const mockProject = { project_Id: 1, name: "Test Project", users: [], tasks: [] };

//         // Mock the `getProjectByName` method in projectDB to return the mock project
//         (projectDB.getProjectByName as jest.Mock).mockResolvedValue(mockProject);

//         const project = await projectService.getProjectByName("Test Project");

//         // Assert the project is returned correctly
//         expect(project.getName()).toBe("Test Project");
//         expect(project.getProjectId()).toBe(1);
//     });

//     test("should throw an error if project is not found by name", async () => {
//         // Mock the `getProjectByName` method to return null (not found)
//         (projectDB.getProjectByName as jest.Mock).mockResolvedValue(null);

//         await expect(projectService.getProjectByName("Nonexistent Project")).rejects.toThrow("Project with name \"Nonexistent Project\" doesn't exist");
//     });

// });
