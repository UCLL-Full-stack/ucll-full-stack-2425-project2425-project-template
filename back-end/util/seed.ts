import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Empty the database
  await prisma.match.deleteMany({});
  await prisma.training.deleteMany({});
  await prisma.team.deleteMany({});
  await prisma.user.deleteMany({});

  // Add new users
  const Chris = await prisma.user.create({
      data: {
        firstName: 'Coach',
        lastName: 'Chris',
        password: 'coachpassword',
        role: 'COACH',
      },
    },
  );

  const Admin = await prisma.user.create({
    data: {
      firstName: 'Admin',
      lastName: 'Adrie',
      password: 'adminpassword',
      role: 'ADMIN',
    },
  });

  const John = await prisma.user.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      password: 'playerpassword',
      role: 'PLAYER',
    },
  });

  const Jane = await prisma.user.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      password: 'playerpassword',
      role: 'PLAYER',
    },
  });

  const Alice = await prisma.user.create({
    data: {
      firstName: 'Alice',
      lastName: 'Johnson',
      password: 'playerpassword',
      role: 'PLAYER',
    },
  });

  // Create a team with the coach and players
  const team = await prisma.team.create({
    data: {
        players: {
            connect: [
                { userId: John.userId },
                { userId: Jane.userId },
                { userId: Alice.userId },
            ],
        },
        coach: {
            connect: { userId: Chris.userId },
        },
    },
  });

  // Update the coach with the teamId
  await prisma.user.update({
    where: { userId: Chris.userId },
    data: { teamId: team.teamId },
  });
}

(async () => {
  try {
    await main();
    await prisma.$disconnect();
    console.log('Seed successful');
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
    console.log('Seed failed');
  }
})();