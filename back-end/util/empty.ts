import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() { 
    await prisma.$executeRawUnsafe('ALTER SEQUENCE "User_id_seq" RESTART WITH 1');
    await prisma.$executeRawUnsafe('ALTER SEQUENCE "Player_id_seq" RESTART WITH 1');
    await prisma.$executeRawUnsafe('ALTER SEQUENCE "World_id_seq" RESTART WITH 1');
    await prisma.$executeRawUnsafe('ALTER SEQUENCE "Floor_id_seq" RESTART WITH 1');
    await prisma.$executeRawUnsafe('ALTER SEQUENCE "Line_id_seq" RESTART WITH 1');
    await prisma.$executeRawUnsafe('ALTER SEQUENCE "Position_id_seq" RESTART WITH 1');

    await prisma.position.deleteMany();
    await prisma.line.deleteMany();
    await prisma.floor.deleteMany();
    await prisma.world.deleteMany();
    await prisma.player.deleteMany();
    await prisma.user.deleteMany();
}