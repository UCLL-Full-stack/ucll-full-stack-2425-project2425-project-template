import { Task } from '../model/task'; // Assuming Task class is in models folder
import { User } from '../model/user'; // Assuming User class is in models folder
import database from './database'; // Import the database connection

export const createTask = async (
  name: string, 
  description: string | null, 
  dueDate: Date, 
  completed: boolean, 
  users: User[]
): Promise<Task> => {

  try {
    const taskPrisma = await database.task.create({
      data: {
        name,
        description,  // description can be null
        dueDate: dueDate,
        completed,
        users: {
          create: users.map(user => ({
            user: {
              connect: { userId: user.user_Id } // Assuming user object has userId field
            }
          }))
        }
      },
      include: {
        users: true // Include users in the returned task object
      }
    });

    // Transform the Prisma result into the Task domain model
    return Task.from(taskPrisma); // Use Task.from() to map to domain model
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const tasksPrisma = await database.task.findMany({
      include: {
        users: true // Include associated users
      }
    });

    // Convert the Prisma result into Task domain models
    return tasksPrisma.map(task => Task.from(task)); // Map Prisma result to Task model
  } catch (error) {
    console.error(error);
    throw new Error('Error retrieving tasks. See server log for details.');
  }
};

export const getTaskById = async (taskId: number): Promise<Task | null> => {
  try {
    const taskPrisma = await database.task.findUnique({
      where: { taskId },
      include: {
        users: true // Include associated users
      }
    });

    // Convert to Task model if found, else return null
    return taskPrisma ? Task.from(taskPrisma) : null; // Map Prisma result to Task model
  } catch (error) {
    console.error(error);
    throw new Error('Error retrieving task. See server log for details.');
  }
};

export default {
  createTask,
  getAllTasks,
  getTaskById,
};
