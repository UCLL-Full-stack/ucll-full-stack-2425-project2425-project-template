import { PrismaClient, PaymentStatus } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.booking.deleteMany();
  await prisma.review.deleteMany();
  await prisma.student.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.user.deleteMany();

  const hashedPasswordStudent1 = await bcrypt.hash("Password123", 12);
  const hashedPasswordStudent2 = await bcrypt.hash("Password456", 12);
  const hashedPasswordAdmin = await bcrypt.hash("Adminpassword1", 12);
  const hashedPasswordGuest = await bcrypt.hash("Guestpassword", 12);

  const user1 = await prisma.user.create({
    data: {
      username: "john_doe",
      email: "john@example.com",
      password: hashedPasswordStudent1,
      firstName: "John",
      lastName: "Doe",
      role: "student",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "jane_smith",
      email: "jane@example.com",
      password: hashedPasswordStudent2,
      firstName: "Jane",
      lastName: "Smith",
      role: "student",
    },
  });

  const admin = await prisma.user.create({
    data: {
      username: "admin_user",
      email: "admin@example.com",
      password: hashedPasswordAdmin,
      firstName: "Admin",
      lastName: "User",
      role: "admin",
    },
  });

  const guest = await prisma.user.create({
    data: {
      username: "guest_user",
      email: "guest@example.com",
      password: hashedPasswordGuest,
      firstName: "Guest",
      lastName: "User",
      role: "guest",
    },
  });

  const student1 = await prisma.student.create({
    data: {
      studentNumber: "S123456",
      userId: user1.id, 
    },
  });

  const student2 = await prisma.student.create({
    data: {
      studentNumber: "S654321",
      userId: user2.id, 
    },
  });

  const trip1 = await prisma.trip.create({
    data: {
      description: "Beach Getaway",
      destination: "Malibu, CA",
      startDate: new Date("2024-07-01"),
      endDate: new Date("2024-07-10"),
      price: 499.99,
    },
  });

  const trip2 = await prisma.trip.create({
    data: {
      description: "Mountain Hiking",
      destination: "Banff, Canada",
      startDate: new Date("2024-08-15"),
      endDate: new Date("2024-08-22"),
      price: 799.99,
    },
  });

  const trip3 = await prisma.trip.create({
    data: {
      description: "City Tour",
      destination: "New York, NY",
      startDate: new Date("2024-09-01"),
      endDate: new Date("2024-09-05"),
      price: 599.99,
    },
  });

  const trip4 = await prisma.trip.create({
    data: {
      description: "Desert Adventure",
      destination: "Phoenix, AZ",
      startDate: new Date("2024-10-01"),
      endDate: new Date("2024-10-07"),
      price: 399.99,
    },
  });

  const trip5 = await prisma.trip.create({
    data: {
      description: "Safari Expedition",
      destination: "Kenya, Africa",
      startDate: new Date("2024-11-01"),
      endDate: new Date("2024-11-15"),
      price: 2499.99,
    },
  });

  const trip6 = await prisma.trip.create({
    data: {
      description: "Northern Lights Experience",
      destination: "Reykjavik, Iceland",
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-10"),
      price: 1599.99,
    },
  });

  const booking1 = await prisma.booking.create({
    data: {                         
      students: {
        connect: {
          id: student1.id,
        },
      },
      tripId: trip1.id,
      paymentStatus: PaymentStatus.Paid,  
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      students: {
        connect: {
          id: student2.id,
        },
      },
      tripId: trip2.id,
      paymentStatus: PaymentStatus.Pending,  
    },
  });

  const booking3 = await prisma.booking.create({
    data: {                         
      students: {
        connect: {
          id: student1.id,
        },
      },
      tripId: trip3.id,
      paymentStatus: PaymentStatus.Paid,  
    },
  });

  const booking4 = await prisma.booking.create({
    data: {
      students: {
        connect: {
          id: student2.id,
        },
      },
      tripId: trip4.id,
      paymentStatus: PaymentStatus.Pending,  
    },
  });

  const booking5 = await prisma.booking.create({
    data: {
      students: {
        connect: {
          id: student1.id,
        },
      },
      tripId: trip5.id,
      paymentStatus: PaymentStatus.Pending,  
    },
  });

  const booking6 = await prisma.booking.create({
    data: {
      students: {
        connect: {
          id: student2.id,
        },
      },
      tripId: trip6.id,
      paymentStatus: PaymentStatus.Paid,  
    },
  });

  const review1 = await prisma.review.create({
    data: {
      rating: 5,
      comment: "Amazing trip, loved the beach!",
      studentId: student1.id,
      tripId: trip1.id,
    },
  });

  const review2 = await prisma.review.create({
    data: {
      rating: 4,
      comment: "Great hiking experience, but could use more food options.",
      studentId: student2.id,
      tripId: trip2.id,
    },
  });

  console.log("Database seeded successfully!");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
