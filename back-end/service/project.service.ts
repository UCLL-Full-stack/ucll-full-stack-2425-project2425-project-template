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
async function getProjectById(project_Id: number) {
  try {
    const project = await prisma.project.findUnique({
      where: { projectId: project_Id },
      include: {
        users: true,
        tasks: true,
      },
    });

    if (!project) {
      throw new Error(`Project with name "${project_Id}" not found`);
    }

    return project;
  } catch (error) {
    console.error(`Error fetching project by name "${project_Id}":`, error);
    throw new Error(`Failed to fetch project with name "${project_Id}"`);
  }
}

export default {
  createProject,
  getAllProjects,
  getProjectById,
};
