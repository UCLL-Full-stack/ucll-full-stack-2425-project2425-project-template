import { Bestelling } from "../../model/bestelling";
import { Ingredient } from "../../model/ingredient";
import { Pokebowl } from "../../model/pokebowl";
import { User } from "../../model/user";


test("given: valid values for bestelling, when: creating bestelling, then: bestelling is created", () => {
    const datum1 = new Date('2024-10-24');
    const user = new User({ naam: "Timmermans", voornaam: "Ashley", email: "ashley.timmermans@student.ucll.be", wachtwoord: "pass", adres: "adresstraat 1", gebruikersnaam: "AshleyT", rol: "admin" });
    const pokebowl =
        new Pokebowl({
            id: 1,
            naam: "Salmon pokebowl",
            type: "Salmon",
            beschrijving: "Fishy salmon pokebowl with avocado and spicy mayo",
            prijs: 10.45,
            maxAantalIngredienten: 5,
            ingredienten: [
                new Ingredient({
                    id: 1,
                    naam: 'Salmon',
                    type: 'Protein',
                    aantal: 50,
                    prijs: 3.61
                }),
                new Ingredient({
                    id: 2,
                    naam: 'Avocado',
                    type: 'Topping',
                    aantal: 30,
                    prijs: 2.78
                }),
                new Ingredient({
                    id: 3,
                    naam: 'Spicy mayo',
                    type: 'Sauce',
                    aantal: 200,
                    prijs: 1.32
                })
            ]
        });

    const bestelling = new Bestelling({ user: user, datum: datum1, pokebowls: [pokebowl] })

    expect(bestelling.getDatum()).toEqual(datum1);
})