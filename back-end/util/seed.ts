import { Prisma, PrismaClient } from "@prisma/client";

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
            location: "Malibu, CA",
            startDate: new Date("2024-07-01"),
            endDate: new Date("2024-07-10"),
            price: 499.99,
        },
    });

    const trip2 = await prisma.trip.create({
        data: {
            description: "Mountain Hiking",
            location: "Banff, Canada",
            startDate: new Date("2024-08-15"),
            endDate: new Date("2024-08-22"),
            price: 799.99,
        },
    });

    const student1 = await prisma.student.create({
        data: {
            username: "john_doe",
            email: "john@example.com",
            password: "password123",
            studentNumber: "S123456",
        },
    });

    const student2 = await prisma.student.create({
        data: {
            username: "jane_smith",
            email: "jane@example.com",
            password: "password456",
            studentNumber: "S654321",
        },
    });

    const booking1 = await prisma.booking.create({
        data: {
            bookingDate: new Date(),
            paymentStatus: "Paid",
            trip: {
                connect: { id: trip1.id }, 
            },
            students: {
                connect: { id: student1.id }, 
            },
        },
    });

    const booking2 = await prisma.booking.create({
        data: {
            bookingDate: new Date(),
            paymentStatus: "Pending",
            trip: {
                connect: { id: trip2.id },
            },
            students: {
                connect: { id: student2.id },
            },
        },
    });

    const review1 = await prisma.review.create({
        data: {
            comment: "Amazing trip! Had a great time.",
            rating: 5,
            student: {
                connect: { id: student1.id },
            },
            trip: {
                connect: { id: trip1.id },
            },
        },
    });

    const review2 = await prisma.review.create({
        data: {
            comment: "The hiking was challenging but rewarding.",
            rating: 4,
            student: {
                connect: { id: student2.id },
            },
            trip: {
                connect: { id: trip2.id },
            },
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
