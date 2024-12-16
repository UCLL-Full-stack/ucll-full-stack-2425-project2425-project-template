import { PrismaClient, PaymentStatus } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
  // Clear the database
  await prisma.booking.deleteMany();
  await prisma.review.deleteMany();
  await prisma.student.deleteMany();
  await prisma.trip.deleteMany();

  // Seed trips
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

  // Hash passwords before storing
  const hashedPasswordStudent1 = await bcrypt.hash("password123", 12);
  const hashedPasswordStudent2 = await bcrypt.hash("password456", 12);
  const hashedPasswordAdmin = await bcrypt.hash("Adminpassword1", 12);
  const hashedPasswordGuest = await bcrypt.hash("guestpassword", 12);

  // Seed students with roles
  const student1 = await prisma.student.create({
    data: {
      username: "john_doe",
      email: "john@example.com",
      password: hashedPasswordStudent1,
      studentNumber: "S123456",
      firstName: "John",
      lastName: "Doe",
      role: "student",
    },
  });

  const student2 = await prisma.student.create({
    data: {
      username: "jane_smith",
      email: "jane@example.com",
      password: hashedPasswordStudent2,
      studentNumber: "S654321",
      firstName: "Jane",
      lastName: "Smith",
      role: "student",
    },
  });

  const admin = await prisma.student.create({
    data: {
      username: "admin_user",
      email: "admin@example.com",
      password: hashedPasswordAdmin,
      studentNumber: "A123456",
      firstName: "Admin",
      lastName: "User",
      role: "admin",
    },
  });

  const guest = await prisma.student.create({
    data: {
      username: "guest_user",
      email: "guest@example.com",
      password: hashedPasswordGuest,
      studentNumber: "G123456",
      firstName: "Guest",
      lastName: "User",
      role: "guest",
    },
  });

  // Create bookings with PaymentStatus
  const booking1 = await prisma.booking.create({
    data: {
      students: {
        connect: {
          id: student1.id,
        },
      },
      tripId: trip1.id,
      paymentStatus: PaymentStatus.Paid,  // Set PaymentStatus to Paid
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
      paymentStatus: PaymentStatus.Pending,  // Set PaymentStatus to Pending
    },
  });

  // Create reviews
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
