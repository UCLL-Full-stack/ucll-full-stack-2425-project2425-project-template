import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () =>{
    await prisma.comment.deleteMany();
    await prisma.list.deleteMany();
    await prisma.review.deleteMany();
    await prisma.user.deleteMany();
}

(async ()=>{
    try{
        await main();
        await prisma.$disconnect();
    } catch(err){
        console.error(err);
        await prisma.$disconnect();
        process.exit(1);
    }
})
