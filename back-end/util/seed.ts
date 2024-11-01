import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
    await prisma.booking.deleteMany();
    await prisma.review.deleteMany();
    await prisma.student.deleteMany();
    await prisma.trip.deleteMany();
}