type Type = "Protein" | "Topping" | "Sauce"
type Rol = "Admin" | "Klant" | "Manager";

type BestellingInput = {
    id?: number;
    user: UserInput;
    datum: Date;
    totaalPrijs?: number;
    pokebowls: PokebowlInput[];

}

type UserInput = {
    id?: number;
    naam: string;
    voornaam: string;
    email: string;
    wachtwoord: string;
    adres: string;
    gebruikersnaam: string;
    rol: Rol;
    bestellingen: BestellingInput[];
}

type IngredientInput = {
    id?: number,
    naam: string,
    type: Type,
    aantal: number,
    prijs: number
};

type PokebowlInput = {
    id?: number,
    naam: string,
    type: string,
    beschrijving: string,
    prijs?: number,
    maxAantalIngredienten: number,
    ingredienten: IngredientInput[]
}

export {
    Type,
    IngredientInput,
    PokebowlInput,
    Rol,
    BestellingInput,
    UserInput
}
