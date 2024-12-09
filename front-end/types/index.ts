export type Type = "Protein" | "Topping" | "Sauce";
export type Rol = "Admin" | "Klant" | "Manager";

export type Ingredient = {
    id?: number,
    naam: string,
    type: Type,
    aantal: number,
    prijs: number
}

export type Pokebowl = {
    id?: number,
    naam: string,
    type: string,
    beschrijving: string,
    prijs?: number,
    maxAantalIngredienten: number,
    ingredienten: Ingredient[]
}

export type Bestelling = {
    id?: number;
    user: User;
    datum?: Date;
    totaalPrijs?: number;
    pokebowls: Pokebowl[];
}

export type User = {
    id?: number;
    naam?: String;
    voornaam?: String;
    email?: String;
    wachtwoord: String;
    adres?: String;
    gebruikersnaam: String;
    rol?: Rol;
    bestellingen?: Bestelling[];
}

export type StatusMessage = {
    message: string;
    type: "error" | "success";
};