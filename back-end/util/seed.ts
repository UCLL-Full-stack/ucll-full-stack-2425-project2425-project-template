import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed roles if you’re using them as enums
  const roles = ['ADMIN', 'USER', 'LECTURER'];

  // Seed Users
  const user1 = await prisma.user.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123', // Remember, you should hash passwords in a real app
      role: 'ADMIN', // Must match the Role enum
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      password: 'password456',
      role: 'USER',
    },
  });

  // Seed Projects
  const project1 = await prisma.project.create({
    data: {
      name: 'Project Alpha',
      description: 'Initial project for testing.',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: 'Project Beta',
      description: 'Second project for testing.',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-11-30'),
    },
  });

  // Seed Tasks
  const task1 = await prisma.task.create({
    data: {
      name: 'Task 1',
      description: 'Complete setup for Project Alpha',
      dueDate: new Date('2024-05-01'),
      completed: false,
      project: { connect: { projectId: project1.projectId } }, // Links to Project Alpha
    },
  });

  const task2 = await prisma.task.create({
    data: {
      name: 'Task 2',
      description: 'Initial draft for Project Beta',
      dueDate: new Date('2024-06-01'),
      completed: false,
      project: { connect: { projectId: project2.projectId } }, // Links to Project Beta
    },
  });

  // Seed User-Project Relations
  await prisma.userProject.create({
    data: {
      userId: user1.userId,
      projectId: project1.projectId,
    },
  });

  await prisma.userProject.create({
    data: {
      userId: user2.userId,
      projectId: project2.projectId,
    },
  });

  // Seed User-Task Relations
  await prisma.userTask.create({
    data: {
      userId: user1.userId,
      taskId: task1.taskId,
    },
  });

  await prisma.userTask.create({
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
    await prisma.$disconnect();
  });
