// migrate db: npx prisma migrate dev
// seed db: npx ts-node util/seed.ts

import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.nieuwsbericht.deleteMany();
    await prisma.leiding.deleteMany();
    await prisma.groep.deleteMany();
    await prisma.activiteit.deleteMany();
    
    const losseLeden = await prisma.groep.create({
        data: {
            naam: 'Losse leden',
            beschrijving: 'Losse leden',
        }
    })

    const kapoenen = await prisma.groep.create({
        data: {
            naam: 'Kapoenen',
            beschrijving: 'De kapoenen',
        }
    })

    const welpen = await prisma.groep.create({
        data: {
            naam: 'Welpen',
            beschrijving: 'De welpen',
        }
    })

    const admin = await prisma.leiding.create({
        data: {
            voornaam: 'Admin',
            naam: 'Admin',
            email: 'a@a.be',
            wachtwoord: await bcrypt.hash('admin', 12),
            rol: 'ADMIN',
            telefoon: '0123456789',
            totem: 'Admin',
            groepId: losseLeden.id
        }
    })

    const hoofdleiding = await prisma.leiding.create({
        data: {
            voornaam: 'Hoofdleiding',
            naam: 'Hoofdleiding',
            email: 'h@h.be',
            wachtwoord: await bcrypt.hash('hoofdleiding', 12),
            rol: 'HOOFDLEIDING',
            telefoon: '0123456789',
            totem: 'Hoofdleiding',
            groepId: kapoenen.id
        }
    })

    const leiding1 = await prisma.leiding.create({
        data: {
            voornaam: 'Leiding1',
            naam: 'Leiding1',
            email: 'l1@l.be',
            wachtwoord: await bcrypt.hash('leiding1', 12),
            rol: 'LEIDING',
            telefoon: '0123456789',
            totem: 'Leiding1',
            groep: {
                connect: { id: kapoenen.id }
            }
        }
    })

    const leiding2 = await prisma.leiding.create({
        data: {
            voornaam: 'Leiding2',
            naam: 'Leiding2',
            email: 'l2@l.be',
            wachtwoord: await bcrypt.hash('leiding2', 12),
            rol: 'LEIDING',
            telefoon: '0123456789',
            totem: 'Leiding2',
            groep: {
                connect: { id: welpen.id }
            }
        }
    })

    const activiteit1 = await prisma.activiteit.create({
        data: {
            naam: 'Activiteit1',
            beschrijving: 'De eerste activiteit',
            beginDatum: new Date(),
            eindDatum: new Date(),
            groepen: {
                connect: { id: kapoenen.id }
            }
        }
    })

    const activiteit2 = await prisma.activiteit.create({
        data: {
            naam: 'Activiteit2',
            beschrijving: 'De tweede activiteit',
            beginDatum: new Date(),
            eindDatum: new Date(),
            groepen: {
                connect: { id: welpen.id }
            }
        }
    })

    const nieuwsbericht1 = await prisma.nieuwsbericht.create({
        data: {
            titel: 'Nieuwsbericht1',
            inhoud: 'Het eerste nieuwsbericht',
            datum: new Date(),
            leidingId: hoofdleiding.id
        }
    })

    const nieuwsbericht2 = await prisma.nieuwsbericht.create({
        data: {
            titel: 'Nieuwsbericht2',
            inhoud: 'Het tweede nieuwsbericht',
            datum: new Date(),
            leidingId: hoofdleiding.id
        }
    })
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