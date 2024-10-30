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

export {
    Rol,
    BestellingInput, 
    UserInput
};

