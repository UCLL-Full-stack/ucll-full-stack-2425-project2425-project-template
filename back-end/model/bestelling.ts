import { Pokebowl } from "./pokebowl";
import { User } from "./user";

export class Bestelling {
    private id?: number;
    private user: User;
    private datum: Date;
    private totaalPrijs: number = 0;
    private pokebowls: Pokebowl[];

    constructor(bestelling: {
        id?: number;
        user: User;
        datum: Date;
        pokebowls: Pokebowl[];
    }) {
        this.id = bestelling.id;
        this.user = bestelling.user;
        this.datum = bestelling.datum;
        this.pokebowls = bestelling.pokebowls;
        this.calculateTotaalPrijs();
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    getDatum(): Date {
        return this.datum;
    }

    getTotaalPrijs(): number {
        return this.totaalPrijs;
    }


    addPokebowl(Pokebowl: Pokebowl) {
        this.pokebowls.push(Pokebowl);
        this.calculateTotaalPrijs();
    }

    removePokebowl(pokebowl: Pokebowl) {
        this.pokebowls = this.pokebowls.filter(p => p !== pokebowl);
        this.calculateTotaalPrijs();
    }

    calculateTotaalPrijs() {
        this.totaalPrijs = 0;

        this.pokebowls.forEach((pokebowl) => {
            const pokebowlPrijs = pokebowl.getPrijs();

            if (pokebowlPrijs) {
                this.totaalPrijs += pokebowlPrijs;
            }
            console.log(`Prijs: ${pokebowl.getNaam()}`);
        });
    }

}