// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'admin',
      phone_number: '1234567890',
      birth_date: new Date('1990-01-01'),
      Address: {
        create: {
          city: 'New York',
          country: 'USA',
          postCode: '10001',
          street: '5th Avenue',
          houseNumber: 1,
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: 'password123',
      role: 'user',
      phone_number: '0987654321',
      birth_date: new Date('1985-05-15'),
      Address: {
        create: {
          city: 'Los Angeles',
          country: 'USA',
          postCode: '90001',
          street: 'Sunset Boulevard',
          houseNumber: 100,
        },
      },
    },
  });

  // Create products
  const product1 = await prisma.product.create({
    data: {
      name: 'Speaker',
      price: 100,
      description: 'Well made speaker',
      rating: 4,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Mouse',
      price: 200,
      description: 'Well made mouse',
      rating: 4,
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: 'Keyboard',
      price: 150,
      description: 'Mechanical keyboard',
      rating: 5,
    },
  });

  // Create carts
  const cart1 = await prisma.cart.create({
    data: {
      userId: user1.id,
      products: {
        connect: [{ id: product1.id }, { id: product2.id }],
      },
      totalPrice: 300,
    },
  });

  const cart2 = await prisma.cart.create({
    data: {
      userId: user2.id,
      products: {
        connect: [{ id: product3.id }],
      },
      totalPrice: 150,
    },
  });

  // Create orders
  await prisma.order.create({
    data: {
      cartId: cart1.id,
      totalPrice: cart1.totalPrice,
      orderDate: new Date(),
    },
  });

  await prisma.order.create({
    data: {
      cartId: cart2.id,
      totalPrice: cart2.totalPrice,
      orderDate: new Date(),
    },
  });

  // Create reviews
  await prisma.review.create({
    data: {
      rating: 5,
      text: 'Great product!',
      userId: user1.id,
      productId: product1.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 4,
      text: 'Good quality',
      userId: user2.id,
      productId: product2.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });