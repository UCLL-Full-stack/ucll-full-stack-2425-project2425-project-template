import { Rol } from "../types";
import { Bestelling } from "./bestelling";

export class User{
    private id?: number;
    private naam: String;
    private voornaam: String;
    private email: String;
    private wachtwoord: String;
    private adres: String;
    private gebruikersnaam: String;
    private rol: Rol;
    private bestellingen: Bestelling[] = [];

    constructor(user: {
        id?: number;
        naam: String;
        voornaam: String;
        email: String;
        wachtwoord: String;
        adres: String;
        gebruikersnaam: String;
        rol: Rol;
    }) {
        this.id = user.id;
        this.naam = user.naam;
        this.voornaam = user.voornaam;
        this.email = user.email;
        this.wachtwoord = user.wachtwoord;
        this.adres = user.adres;
        this.gebruikersnaam = user.gebruikersnaam;
        this.rol = user.rol;
    }

    getId(): number | undefined {
        return this.id;
    }

    getNaam(): String{
        return this.naam;
    }

    getVoornaam(): String{
        return this.voornaam;
    }

    getEmail(): String{
        return this.email;
    }

    getWachtwoord(): String{
        return this.wachtwoord;
    }

    getAdres(): String{
        return this.adres;
    }

    getGebruikersnaam(): String{
        return this.gebruikersnaam;
    }

    getBestellingen(): Bestelling[]{
        return this.bestellingen;
    }

    getRol(): Rol{
        return this.rol;
    }

    register(): void {
        console.log("User registrated successfully")
    }

    order(bestelling:Bestelling): void {
        this.bestellingen.push(bestelling);
    }

    login(): boolean {
        console.log("User logged in succesfully")
        return true;
        //ook dit moet wss nog aangepast worden
    }

    deleteUser(user:User): void{
        console.log("User deleted")
    }

    updateUser(user:User){
        Object.assign(this, user);
        console.log("User updated")
    }

}