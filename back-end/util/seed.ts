import { PrismaClient, Role } from '@prisma/client';
import database from '../repository/database';

async function main() {

  // Delete user-project relations first
  await database.userProject.deleteMany();

  // Delete user-task relations
  await database.userTask.deleteMany();

  // Now, delete the users
  await database.user.deleteMany();

  await database.project.deleteMany();

  // Now, delete the users
  await database.user.deleteMany();

  // Seed Users
  const user1 = await database.user.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123', 
      role: Role.ADMIN, 
    },
  });

  const user2 = await database.user.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      password: 'password456',
      role: Role.USER,
    },
  });

  // Seed Projects
  const project1 = await database.project.create({
    data: {
      name: 'Project Alpha',
      description: 'Initial project for testing.',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
    },
  });

  const project2 = await database.project.create({
    data: {
      name: 'Project Beta',
      description: 'Second project for testing.',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-11-30'),
    },
  });

  // Seed Tasks
  const task1 = await database.task.create({
    data: {
      name: 'Task 1',
      description: 'Complete setup for Project Alpha',
      dueDate: new Date('2024-05-01'),
      completed: false,
      project: { connect: { projectId: project1.projectId } }, // Links to Project Alpha
    },
  });

  const task2 = await database.task.create({
    data: {
      name: 'Task 2',
      description: 'Initial draft for Project Beta',
      dueDate: new Date('2024-06-01'),
      completed: false,
      project: { connect: { projectId: project2.projectId } }, // Links to Project Beta
    },
  });

  // Seed User-Project Relations
  await database.userProject.create({
    data: {
      userId: user1.userId,
      projectId: project1.projectId,
    },
  });

  await database.userProject.create({
    data: {
      userId: user2.userId,
      projectId: project2.projectId,
    },
  });

  // Seed User-Task Relations
  await database.userTask.create({
    data: {
      userId: user1.userId,
      taskId: task1.taskId,
    },
  });

  await database.userTask.create({
    data: {
      userId: user2.userId,
      taskId: task2.taskId,
    },
  });
}

main()
  .then(() => {
    console.log('Seeding completed.');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await database.$disconnect();
  });
