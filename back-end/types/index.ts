type Rol = "admin" | "klant";

type BestellingInput = {
    id?:number;
    datum: Date;
    totaalPrijs?: number;
    //pokebowls: Pokebowl[];

}

type UserInput = {
    id?: number;
    naam: String;
    voornaam: String;
    email: String;
    wachtwoord: String;
    adres: String;
    gebruikersnaam: String;
    rol: Rol;
}

type IngredientInput = {
    id?: number,
    naam: string,
    type: string,
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
    IngredientInput,
    PokebowlInput,
    Rol,
    BestellingInput, 
    UserInput
}
