import { PrismaClient } from '@prisma/client';
import { Role } from '@prisma/client';

const database = new PrismaClient();

async function main() {
  // Delete user-project relations first
  await database.userProject.deleteMany();

  // Delete user-task relations
  await database.userTask.deleteMany();

  // Now, delete the users
  await database.user.deleteMany();

  // Delete projects
  await database.project.deleteMany();

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

  const user3 = await database.user.create({
    data: {
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      password: 'password789',
      role: Role.USER,
    },
  });

  const user4 = await database.user.create({
    data: {
      firstName: 'Bob',
      lastName: 'Brown',
      email: 'bob.brown@example.com',
      password: 'password101',
      role: Role.USER,
    },
  });

  const user5 = await database.user.create({
    data: {
      firstName: 'Charlie',
      lastName: 'Davis',
      email: 'charlie.davis@example.com',
      password: 'password102',
      role: Role.USER,
    },
  });

  console.log('Seeded users:', { user1, user2, user3, user4, user5 });

  // Seed Projects
  const project1 = await database.project.create({
    data: {
      name: 'Project 1',
      description: 'Description for project 1',
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const project2 = await database.project.create({
    data: {
      name: 'Project 2',
      description: 'Description for project 2',
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  console.log('Seeded projects:', { project1, project2 });

  // Seed Tasks
  const task1 = await database.task.create({
    data: {
      name: 'Task 1',
      description: 'Description for task 1',
      dueDate: new Date(),
      completed: false,
    },
  });

  const task2 = await database.task.create({
    data: {
      name: 'Task 2',
      description: 'Description for task 2',
      dueDate: new Date(),
      completed: false,
    },
  });

  console.log('Seeded tasks:', { task1, task2 });

  // Seed User-Project Relations
  await database.userProject.create({
    data: {
      userId: user1.userId,
      projectId: project1.project_Id,
    },
  });

  await database.userProject.create({
    data: {
      userId: user2.userId,
      projectId: project2.project_Id,
  }});

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

  console.log('Seeded user-project and user-task relations');
}

main()
  .then(() => {
    console.log('Seeding completed successfully');
  })
  .catch((e) => {
    console.error('Error during seeding:', e);
  })
  .finally(async () => {
    await database.$disconnect();
  });
