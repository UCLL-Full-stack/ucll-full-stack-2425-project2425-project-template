import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createProject = async ({ name, users, tasks }: { name: string, users: number[], tasks: number[] }) => {
    const project = await prisma.project.create({
        data: {
            name,
            users: {
                connect: users.map(userId => ({
                    id: userId // Assuming 'id' is the unique identifier for User
                }))
            },
            tasks: {
                connect: tasks.map(taskId => ({
                    id: taskId // Assuming 'id' is the unique identifier for Task
                }))
            }
        },
        include: {
            users: true,
            tasks: true
        }
    });

    return project;
};

const getAllProjects = async () => {
    return await prisma.project.findMany({
        include: {
            users: true,
            tasks: true
        }
    });
};

const getProjectByName = async (name: string) => {
    return await prisma.project.findUnique({
        where: { name },
        include: {
            users: true,
            tasks: true
        }
    });
};

export default {
    createProject,
    getAllProjects,
    getProjectByName
};