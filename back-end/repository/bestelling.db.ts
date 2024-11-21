import { Bestelling } from "../model/bestelling";
import { Ingredient } from "../model/ingredient";
import { Pokebowl } from "../model/pokebowl";
import { User } from "../model/user";
import database from "./database";

// const bestellingen: Bestelling[] = [
//     new Bestelling({
//         id: 1,
//         user: new User({
//             id: 2,
//             naam: "de Weerd",
//             voornaam: "Nina",
//             email: "nina.deweerd@email.com",
//             wachtwoord: "helloworld!",
//             adres: "Heverleesestraat 20",
//             gebruikersnaam: "NinadW",
//             rol: "klant"
//         }),
//         datum: new Date("2024-10-30T18:30:00"),
//         pokebowls: [
//             new Pokebowl({
//                 id: 1,
//                 naam: "Salmon pokebowl",
//                 type: "Salmon",
//                 beschrijving: "Fishy salmon pokebowl with avocado and spicy mayo",
//                 prijs: 10.45,
//                 maxAantalIngredienten: 5,
//                 ingredienten: [
//                     new Ingredient({
//                         id: 1,
//                         naam: 'Salmon',
//                         type: 'Protein',
//                         aantal: 50,
//                         prijs: 3.61
//                     }),
//                     new Ingredient({
//                         id: 2,
//                         naam: 'Avocado',
//                         type: 'Topping',
//                         aantal: 30,
//                         prijs: 2.78
//                     }),
//                     new Ingredient({
//                         id: 3,
//                         naam: 'Spicy mayo',
//                         type: 'Sauce',
//                         aantal: 200,
//                         prijs: 1.32
//                     })
//                 ]
//             }),
//             new Pokebowl({
//                 id: 2,
//                 naam: "Tuna pokebowl",
//                 type: "Tuna",
//                 beschrijving: "Fishy tuna pokebowl with seaweed, corn and srirachia sauce",
//                 maxAantalIngredienten: 6,
//                 ingredienten: [
//                     new Ingredient({
//                         id: 4,
//                         naam: 'Tuna',
//                         type: 'Protein',
//                         aantal: 50,
//                         prijs: 3.61
//                     }),
//                     new Ingredient({
//                         id: 5,
//                         naam: 'Corn',
//                         type: 'Topping',
//                         aantal: 198,
//                         prijs: 0.54
//                     }),
//                     new Ingredient({
//                         id: 6,
//                         naam: 'Seaweed',
//                         type: 'Topping',
//                         aantal: 228,
//                         prijs: 1.09
//                     }),
//                     new Ingredient({
//                         id: 7,
//                         naam: 'Srirachia',
//                         type: 'Sauce',
//                         aantal: 450,
//                         prijs: 1.14
//                     })
//                 ]
//             })
//         ]
//     }),
//     new Bestelling({
//         id: 2,
//         user: new User({
//             id: 1,
//             naam: "Timmermans",
//             voornaam: "Ashley",
//             email: "ashley.timmermans@email.com",
//             wachtwoord: "welkom123",
//             adres: "Leuvensestraat 10",
//             gebruikersnaam: "AshleyT",
//             rol: "klant"
//         }),
//         datum: new Date("2024-10-16T18:00:00"),
//         pokebowls: [
//             new Pokebowl({
//                 id: 2,
//                 naam: "Tuna pokebowl",
//                 type: "Tuna",
//                 beschrijving: "Fishy tuna pokebowl with seaweed, corn and srirachia sauce",
//                 maxAantalIngredienten: 6,
//                 ingredienten: [
//                     new Ingredient({
//                         id: 4,
//                         naam: 'Tuna',
//                         type: 'Protein',
//                         aantal: 50,
//                         prijs: 3.61
//                     }),
//                     new Ingredient({
//                         id: 5,
//                         naam: 'Corn',
//                         type: 'Topping',
//                         aantal: 198,
//                         prijs: 0.54
//                     }),
//                     new Ingredient({
//                         id: 6,
//                         naam: 'Seaweed',
//                         type: 'Topping',
//                         aantal: 228,
//                         prijs: 1.09
//                     }),
//                     new Ingredient({
//                         id: 7,
//                         naam: 'Srirachia',
//                         type: 'Sauce',
//                         aantal: 450,
//                         prijs: 1.14
//                     })
//                 ]
//             })
//         ]
//     }),
//     new Bestelling({
//         id: 3,
//         user: new User({
//             id: 2,
//             naam: "de Weerd",
//             voornaam: "Nina",
//             email: "nina.deweerd@email.com",
//             wachtwoord: "helloworld!",
//             adres: "Heverleesestraat 20",
//             gebruikersnaam: "NinadW",
//             rol: "klant"
//         }),
//         datum: new Date("2024-10-02T18:00:00"),
//         pokebowls: [
//             new Pokebowl({
//                 id: 1,
//                 naam: "Salmon pokebowl",
//                 type: "Salmon",
//                 beschrijving: "Fishy salmon pokebowl with avocado and spicy mayo",
//                 prijs: 10.45,
//                 maxAantalIngredienten: 5,
//                 ingredienten: [
//                     new Ingredient({
//                         id: 1,
//                         naam: 'Salmon',
//                         type: 'Protein',
//                         aantal: 50,
//                         prijs: 3.61
//                     }),
//                     new Ingredient({
//                         id: 2,
//                         naam: 'Avocado',
//                         type: 'Topping',
//                         aantal: 30,
//                         prijs: 2.78
//                     }),
//                     new Ingredient({
//                         id: 3,
//                         naam: 'Spicy mayo',
//                         type: 'Sauce',
//                         aantal: 200,
//                         prijs: 1.32
//                     })
//                 ]
//             })
//         ]
//     }),
// ];

// const createBestelling = (bestelling: Bestelling) => {
//     bestellingen.push(bestelling);
// };

const getAllBestellingen = async (): Promise<Bestelling[]> => {
    try {
        const bestellingenPrisma = await database.bestelling.findMany({
            include: {
                user: true,
                pokebowls: true
            },
        });
        return bestellingenPrisma.map((bestellingPrisma) => Bestelling.from(bestellingPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


const getBestellingById = async ({ id }: { id: number }): Promise<Bestelling | null> => {
    try {
        const bestellingenPrisma = await database.bestelling.findUnique({
            where: {
                id: id
            }, include: {
                user: true,
                pokebowls: true
            },
        });
        if (bestellingenPrisma == null) {
            return null;
        }
        return Bestelling.from(bestellingenPrisma);
    } catch (err) {
        console.error(err);
        throw new Error('Database error. See server logs for details.')
    }
}

const getBestellingenByUser = async ({ id }: { id: number }): Promise<Bestelling[]> => {
    try {
        const bestellingenPrisma = await database.bestelling.findMany({
            where: {
                user: { id: id }
            }, include: {
                user: true,
                pokebowls: true
            },
        });
        return bestellingenPrisma.map((bestellingPrisma) => Bestelling.from(bestellingPrisma));
    } catch (err) {
        console.error(err);
        throw new Error('Database error. See server logs for details.')
    }
}

export default { getAllBestellingen, getBestellingById, getBestellingenByUser };