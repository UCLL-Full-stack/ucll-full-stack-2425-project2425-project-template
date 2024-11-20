import { Ingredient } from "./ingredient";

export class Pokebowl {
    private id?: number;
    private naam: string;
    private type: string;
    private beschrijving: string;
    private maxAantalIngredienten: number;
    private prijs?: number;
    private ingredienten: Ingredient[];

    constructor(pokebowl: {
        id?: number;
        naam: string;
        type: string;
        beschrijving: string;
        prijs?: number;
        maxAantalIngredienten: number;
        ingredienten: Array<Ingredient>;
    }) {
        this.validate(pokebowl);

        this.id = pokebowl.id;
        this.naam = pokebowl.naam;
        this.type = pokebowl.type;
        this.prijs = pokebowl.prijs;
        this.beschrijving = pokebowl.beschrijving;
        this.maxAantalIngredienten = pokebowl.maxAantalIngredienten;
        this.ingredienten = pokebowl.ingredienten;
        this.calculatePrice();
    }

    validate(pokebowl: {
        naam: string;
        type: string;
        beschrijving: string;
        prijs?: number;
        maxAantalIngredienten: number;
        ingredienten: Array<Ingredient>
    }) {
        if (!pokebowl.naam) {
            throw new Error("Naam cannot be empty");
        }
        if (!pokebowl.type) {
            throw new Error("Type cannot be empty");
        }
        if (!pokebowl.beschrijving) {
            throw new Error("Beschrijving cannot be empty");
        }
        if (pokebowl.prijs && pokebowl.prijs < 0) {
            throw new Error("Prijs must be a positive number");
        }
        if (!pokebowl.maxAantalIngredienten) {
            throw new Error("Max aantal ingredienten cannot be empty");
        }
        if (pokebowl.maxAantalIngredienten < 0) {
            throw new Error("Max aantal ingredienten must be a positive number");
        }
        if (pokebowl.ingredienten.length > pokebowl.maxAantalIngredienten) {
            throw new Error("Cannot add more ingredients");
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getNaam(): string {
        return this.naam;
    }

    getType(): string {
        return this.type;
    }

    getBeschrijving(): string {
        return this.beschrijving;
    }

    getPrijs(): number | undefined {
        return this.calculatePrice();
    }

    setPrijs(prijs: number) {
        this.prijs = prijs;
    }

    getMaxAantalIngredienten(): number {
        return this.maxAantalIngredienten;
    }

    getIngredienten(): Array<Ingredient> {
        return this.ingredienten;
    }

    addIngredient(ingredient: Ingredient) {
        const aantalIngredienten = this.ingredienten.filter(
            (ingr) => ingr.getNaam() === ingredient.getNaam()).length;
        console.log(aantalIngredienten);

        if (this.ingredienten.length >= this.maxAantalIngredienten) {
            throw new Error('Cannot add more ingredienten');
        }
        if (aantalIngredienten >= ingredient.getIngredientLimit()) {
            throw new Error(`Cannot add more ${ingredient.getNaam()} `);
        }

        let aantal = ingredient.getAantal();
        ingredient.setAantal(aantal -= 1);
        this.ingredienten.push(ingredient);
        this.calculatePrice();
    }

    calculatePrice() {
        let prijs: number;

        if (!this.prijs) {
            prijs = 5;

            this.ingredienten.forEach((ingredient) => {
                prijs += ingredient.getPrijs();
                console.log(`standaardPrijs: ${ingredient.getNaam()}`);
            });

        } else {
            prijs = this.prijs;
        }
        this.setPrijs(Number(prijs.toFixed(2)));
        return this.prijs;
    }
}