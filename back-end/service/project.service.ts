import { PrismaClient } from '@prisma/client';
import { ProjectInput, UserInput } from "../types"; // Assuming ProjectInput is defined correctly
import projectDb from '../repository/project.db';
import userDb from '../repository/user.db';
import { Project } from '../model/project';

// Initialize PrismaClient
const prisma = new PrismaClient();

// Service function to create a new project
async function createProject(data: ProjectInput) {
  try {
    // Check for duplicate project name
    const existingProject = await prisma.project.findUnique({
      where: { name: data.name },
    });

    if (existingProject) {
      throw new Error(`Project with name "${data.name}" already exists`);
    }

    // Create the project if no duplicate
    if (!data.name) {
      throw new Error("Project name is required");
    }

    const project = await prisma.project.create({
      data: {
        name: data.name,
      },
    });

    return project;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

// Service function to retrieve all projects with related users and tasks
async function getAllProjects() {
  try {
    return await prisma.project.findMany({
      include: {
        users: true,
        tasks: true,
      },
    });
  } catch (error) {
    console.error("Error fetching all projects:", error);
    throw new Error("Failed to fetch projects");
  }
}

// Service function to retrieve a project by its ID
async function getProjectById(project_Id: number) {
  try {
    const project = await prisma.project.findUnique({
      where: { project_Id: project_Id },
      include: {
        users: true,
        tasks: true,
      },
    });

    if (!project) {
      throw new Error(`Project with ID "${project_Id}" not found`);
    }

    return project;
  } catch (error) {
    console.error(`Error fetching project by ID "${project_Id}":`, error);
    throw new Error(`Failed to fetch project with ID "${project_Id}"`);
  }
}

// Service function to add a user to a project
const addUserToProject = async ({
  project: projectInput,
  users: usersInput,
}: {
  project:ProjectInput;
  users: UserInput[];
}): Promise<Project | null> => {
  if (!usersInput.length) throw new Error('At least one user is required');

  if (projectInput.id === undefined) {
    throw new Error('Project ID is required');
  }
  const project = await projectDb.getProjectById({ id: projectInput.id });
  if (!project) throw new Error('Project not found');

  const users = await Promise.all(
      usersInput.map(async (userInput) => {
          const student = await userDb.getUserById({ id: userInput.id });
          if (!student) throw new Error(`Student with id ${userInput.id} not found`);
          return student;
      })
  );

  users.forEach((user) => {
      project.addUserToProject(user);
  });

  return await projectDb.updateUsersOfProject({ project });
};

export default {
  createProject,
  getAllProjects,
  getProjectById,
  addUserToProject,
};
