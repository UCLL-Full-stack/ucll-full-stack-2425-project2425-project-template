import { PrismaClient } from '@prisma/client';
import { ProjectInput } from "../types"; // Assuming ProjectInput is defined correctly

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

// Service function to retrieve a project by its name
async function getProjectByName(name: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { name },
      include: {
        users: true,
        tasks: true,
      },
    });

    if (!project) {
      throw new Error(`Project with name "${name}" not found`);
    }

    return project;
  } catch (error) {
    console.error(`Error fetching project by name "${name}":`, error);
    throw new Error(`Failed to fetch project with name "${name}"`);
  }
}

export default {
  createProject,
  getAllProjects,
  getProjectByName,
};
