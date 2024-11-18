import { Rol } from "../types";
import { Bestelling } from "./bestelling";
import { User as UserPrisma } from '@prisma/client';
import { Bestelling as BestellingPrisma } from '@prisma/client';
export class User {

    static from({
        id,
        naam,
        voornaam,
        email,
        wachtwoord,
        adres,
        gebruikersnaam,
        rol
    }: UserPrisma) {
        return new User({
            id,
            naam,
            voornaam,
            email,
            wachtwoord,
            adres,
            gebruikersnaam,
            rol
        });
    }


    private id?: number;
    private naam: string;
    private voornaam: string;
    private email: string;
    private wachtwoord: string;
    private adres: string;
    private gebruikersnaam: string;
    private rol: Rol;
    private bestellingen: Bestelling[] = [];

    constructor(user: {
        id?: number;
        naam: string;
        voornaam: string;
        email: string;
        wachtwoord: string;
        adres: string;
        gebruikersnaam: string;
        rol: Rol;
        //bestellingen: Array<Bestelling>;
    }) {
        this.id = user.id;
        this.naam = user.naam;
        this.voornaam = user.voornaam;
        this.email = user.email;
        this.wachtwoord = user.wachtwoord;
        this.adres = user.adres;
        this.gebruikersnaam = user.gebruikersnaam;
        this.rol = user.rol;
        //this.bestellingen = user.bestellingen;
    }

    getId(): number | undefined {
        return this.id;
    }

    getNaam(): string {
        return this.naam;
    }

    getVoornaam(): string {
        return this.voornaam;
    }

    getEmail(): string {
        return this.email;
    }

    getWachtwoord(): string {
        return this.wachtwoord;
    }

    getAdres(): string {
        return this.adres;
    }

    getGebruikersnaam(): string {
        return this.gebruikersnaam;
    }

    getBestellingen(): Bestelling[] {
        return this.bestellingen;
    }

    getRol(): Rol {
        return this.rol;
    }

    register(): void {
        console.log("User registrated successfully")
    }

    order(bestelling: Bestelling): void {
        this.bestellingen.push(bestelling);
    }

    login(): boolean {
        console.log("User logged in succesfully")
        return true;
        //ook dit moet wss nog aangepast worden
    }

    deleteUser(user: User): void {
        console.log("User deleted")
    }

    updateUser(user: User) {
        Object.assign(this, user);
        console.log("User updated")
    }

}