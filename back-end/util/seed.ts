// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.bestelling.deleteMany();
    await prisma.user.deleteMany();
    await prisma.ingredient.deleteMany();
    await prisma.pokebowl.deleteMany();

    let userKlant = await prisma.user.create({
        data: {
            naam: "Timmermans",
            voornaam: "Ashley",
            email: "ashley.timmermans@email.com",
            wachtwoord: await bcrypt.hash("welkom123", 12),
            adres: "Leuvensestraat 10",
            gebruikersnaam: "AshleyT",
            rol: "Klant",
            bestellingen: {
                connect: []
            }
        }
    });

    const userKlant2 = await prisma.user.create({
        data: {
            naam: "de Weerd",
            voornaam: "Nina",
            email: "nina.deweerd@email.com",
            wachtwoord: await bcrypt.hash("helloworld!", 12),
            adres: "Heverleesestraat 20",
            gebruikersnaam: "NinadW",
            rol: "Klant",
            bestellingen: {
                connect: []
            }
        }
    });

    const userAdmin = await prisma.user.create({
        data: {
            naam: "Doe",
            voornaam: "John",
            email: "john.doe@email.com",
            wachtwoord: await bcrypt.hash("password", 12),
            adres: "Teststraat 123",
            gebruikersnaam: "JohnD",
            rol: "Admin",
            bestellingen: {
                connect: []
            }
        }
    });

    const userManager = await prisma.user.create({
        data: {
            naam: "Toe",
            voornaam: "Jane",
            email: "jane.toe@email.com",
            wachtwoord: await bcrypt.hash("hihihi3", 12),
            adres: "Teststraat 321",
            gebruikersnaam: "JaneT",
            rol: "Manager",
            bestellingen: {
                connect: []
            }
        }
    });

    const userAdmin2 = await prisma.user.create({
        data: {
            naam: "Admin",
            voornaam: "Admin",
            email: "admin.admin@email.com",
            wachtwoord: await bcrypt.hash("admin", 12),
            adres: "Teststraat 321",
            gebruikersnaam: "admin",
            rol: "Admin",
            bestellingen: {
                connect: []
            }
        }
    });

    const salmonIngredient = await prisma.ingredient.create({
        data: {
            naam: "Salmon",
            type: "Protein",
            aantal: 180,
            prijs: 2.30
        }
    });

    const tunaIngredient = await prisma.ingredient.create({
        data: {
            naam: "Tuna",
            type: "Protein",
            aantal: 245,
            prijs: 1.97
        }
    });

    const tofuIngredient = await prisma.ingredient.create({
        data: {
            naam: "Tofu",
            type: "Protein",
            aantal: 82,
            prijs: 2.24
        }
    });

    const mangoIngredient = await prisma.ingredient.create({
        data: {
            naam: "Mango",
            type: "Topping",
            aantal: 476,
            prijs: 0.85
        }
    });

    const cucumberIngredient = await prisma.ingredient.create({
        data: {
            naam: "Cucumber",
            type: "Topping",
            aantal: 621,
            prijs: 0.43
        }
    });

    const seaweedIngredient = await prisma.ingredient.create({
        data: {
            naam: "Seaweed",
            type: "Topping",
            aantal: 179,
            prijs: 0.77
        }
    });

    const spicymayoIngredient = await prisma.ingredient.create({
        data: {
            naam: "Spicy Mayo",
            type: "Sauce",
            aantal: 56,
            prijs: 0.21
        }
    });

    const srirachiaIngredient = await prisma.ingredient.create({
        data: {
            naam: "Srirachia",
            type: "Sauce",
            aantal: 47,
            prijs: 0.23
        }
    });

    const salmonPokebowl = await prisma.pokebowl.create({
        data: {
            naam: "Salmon pokebowl",
            type: "Salmon",
            beschrijving: "Delicious salmon pokebowl with mango and seaweed",
            prijs: 12.56,
            maxAantalIngredienten: 8,
            ingredienten: {
                connect: [{ id: salmonIngredient.id }, { id: mangoIngredient.id }, { id: seaweedIngredient.id }, { id: spicymayoIngredient.id }]
            }
        }
    });

    const tunaPokebowl = await prisma.pokebowl.create({
        data: {
            naam: "Tuna pokebowl",
            type: "Tuna",
            beschrijving: "Delicious Tuna pokebowl with cucumber and srirachia sauce",
            prijs: 10.80,
            maxAantalIngredienten: 5,
            ingredienten: {
                connect: [{ id: tunaIngredient.id }, { id: cucumberIngredient.id }, { id: srirachiaIngredient.id }]
            }
        }
    });

    const bestellingSalmonPokebowl = await prisma.bestelling.create({
        data: {
            user: {
                connect: { id: userKlant.id }
            },
            datum: new Date("2024-10-02"),
            pokebowls: {
                connect: [{ id: salmonPokebowl.id }]
            }
        }
    });

    const bestellingSalmonTunaPokebowl = await prisma.bestelling.create({
        data: {
            user: {
                connect: { id: userKlant2.id }
            },
            datum: new Date("2024-11-11"),
            pokebowls: {
                connect: [{ id: salmonPokebowl.id }, { id: tunaPokebowl.id }]
            }
        }
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
