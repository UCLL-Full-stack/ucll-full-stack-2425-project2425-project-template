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
            beschrijving: `Het leven van een kapoen (6-8 jaar) is er één vol spel, fantasie, creativiteit en expressie. Spelenderwijs en ongedwongen ontdekken we samen met hen de wereld. De leiding gaat hierbij uit van het kind zelf, van wat hen boeit en aanspreekt. Algemeen contact: kapoenen@scoutsoverijse.be`,
        }
    })

    const welpen = await prisma.groep.create({
        data: {
            naam: 'Welpen',
            beschrijving: `Wie tussen 8 en 10 jaar is, kan meespelen bij de welpen. Het is typisch voor welpen dat ze zelf dingen leren doen. Ze krijgen ruimte en kansen om dingen uit te proberen en van elkaar te leren. De werking wordt ingekleed met verhalen en fantasie. Hierbij wordt gebruik gemaakt van het Jungleboek. Zo komt het dat vaste kleine groepen “nesten” genoemd worden. “Raadsrots” is het moment waarop welpen gaan samenzitten om over van alles te kletsen en mee te beslissen. Algemeen contact: welpen@scoutsoverijse.be`,
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
            naam: 'Buiten spelen',
            beschrijving: 'Vandaag gaan we een hele dag buitenspelen, zorg er dus voor dat je de juiste kledij aan hebt!',
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

    const activiteit3 = await prisma.activiteit.create({
        data: {
            naam: 'Activiteit3',
            beschrijving: 'De derde activiteit',
            beginDatum: new Date("2024-09-29 14:00:00"),
            eindDatum: new Date("2024-09-29 17:00:00"),
            groepen: {
                connect: { id: kapoenen.id }
            }
        }
    })

    const activiteit4 = await prisma.activiteit.create({
        data: {
            naam: 'Activiteit4',
            beschrijving: 'De vierde activiteit',
            beginDatum: new Date("2024-10-5 14:00:00"),
            eindDatum: new Date("2024-10-6 17:00:00"),
            groepen: {
                connect: { id: kapoenen.id }
            }
        }
    })

    const nieuwsbericht1 = await prisma.nieuwsbericht.create({
        data: {
            titel: 'inschrijvingen scoutsjaar 2024-2025',
            inhoud: `Beste ouders en leden, 
        na weer twee lange maanden zonder scouts zijn we eindelijk weer terug! Zondag 29 september start het nieuwe fantastische scoutsjaar, van 14u tot 17u is elke jongen van 6 tot 17 jaar van harte welkom. Hieronder vindt u de inschrijvingslink voor het scoutsjaar 2024-2025:
        https://forms.office.com/Pages/ResponsePage.aspx?id=G4Y45tkV5k2mXbSHia4fCIrv-xVnqwhGiPRhhKckvedUN1ROQ1kyWTdGQ1ZGN1ZHQzI3MTNLUU5QRC4u`,
            datum: new Date(),
            leidingId: hoofdleiding.id
        }
    })

    const nieuwsbericht2 = await prisma.nieuwsbericht.create({
        data: {
            titel: 'GDPR wetgeving',
            inhoud: `Beste ouders, 
            Via deze link kan u naar onze GDPR wetgeving pagina gaan.
            https://docs.google.com/document/d/1pe6MTjk5iv7z-8TXW39-I7fcgSCO77TT7c1QmWDROIc/edit?usp=sharing`,
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