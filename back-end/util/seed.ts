import { PrismaClient } from '@prisma/client';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.deleteMany();
  await prisma.account.deleteMany();
  await prisma.transaction.deleteMany();

  // Set reusable date values
  const startDate1 = set(new Date(), { year: 2023, month: 0, date: 1 });
  const startDate2 = set(new Date(), { year: 2023, month: 2, date: 1 });
  const birthDate1 = set(new Date(), { year: 1992, month: 4, date: 24 });
  const birthDate2 = set(new Date(), { year: 1985, month: 11, date: 10 });

  // Create users
  const user1 = await prisma.user.create({
    data: {
      nationalRegisterNumber: '92.05.24-123.45',
      name: 'Alice Johnson',
      birthDate: birthDate1,
      isAdministrator: true,
      phoneNumber: '+32475123456',
      email: 'alice.johnson@example.com',
      password: 'SecureP@ssw0rd',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      nationalRegisterNumber: '85.12.10-987.65',
      name: 'Bob Smith',
      birthDate: birthDate2,
      isAdministrator: false,
      phoneNumber: '+32476123456',
      email: 'bob.smith@example.com',
      password: 'BobP@ss123!',
    },
  });

  // Create accounts
  const account1 = await prisma.account.create({
    data: {
      accountNumber: 1234567890,
      balance: 1000.0,
      isShared: false,
      startDate: startDate1,
      endDate: null,
      status: 'Active',
      type: 'transaction',
      users: {
        connect: [{ id: user1.id }],
      },
    },
  });

  const account2 = await prisma.account.create({
    data: {
      accountNumber: 9876543210,
      balance: 500.0,
      isShared: true,
      startDate: startDate2,
      endDate: null,
      status: 'Active',
      type: 'savings',
      users: {
        connect: [{ id: user1.id }, { id: user2.id }],
      },
    },
  });

  // Create transactions
  const transaction1 = await prisma.transaction.create({
    data: {
      referenceNumber: 'INC-789-2023-12345',
      date: new Date(),
      amount: 100,
      currency: 'EUR',
      transactionType: 'INCOME', 
      account: {
        connect: { id: account1.id },
      },
      source: 'Salary', 
    },
  });

  const transaction2 = await prisma.transaction.create({
    data: {
      referenceNumber: 'EXP-987-2023-67890',
      date: new Date(),
      amount: 50,
      currency: 'USD',
      transactionType: 'EXPENSE', 
      account: {
        connect: { id: account2.id },
      },
      destination: 'Groceries', 
    },
  });
};

(async () => {
  try {
    await main();
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
})();