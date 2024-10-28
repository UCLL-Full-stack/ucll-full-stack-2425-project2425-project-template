import { Groep } from "./groep";

export class Leiding{
    private id?: number;
    private naam: string;
    private voornaam: string;
    private email: string;
    private telefoon: string;
    private hoofdleiding: boolean;
    private totem: string;
    private groep?: Groep;

    constructor(leiding:{
        id?: number,
        naam: string,
        voornaam: string,
        email: string,
        telefoon: string,
        hoofdleiding: boolean,
        totem: string,
        groep?: Groep
    }) {
        this.id = leiding.id;
        this.naam = leiding.naam;
        this.voornaam = leiding.voornaam;
        this.email = leiding.email;
        this.telefoon = leiding.telefoon;
        this.hoofdleiding = leiding.hoofdleiding;
        this.totem = leiding.totem;
        this.groep = leiding.groep;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getNaam(): string {
        return this.naam;
    }

    public getVoornaam(): string {
        return this.voornaam;
    }

    public getEmail(): string {
        return this.email;
    }

    public getTelefoon(): string {
        return this.telefoon;
    }

    public getHoofdleiding(): boolean {
        return this.hoofdleiding;
    }

    public getTotem(): string {
        return this.totem;
    }

    public getGroep(): Groep | undefined {
        return this.groep;
    }

    public setNaam(naam: string): void {
        this.naam = naam;
    }

    public setVoornaam(voornaam: string): void {
        this.voornaam = voornaam;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setTelefoon(telefoon: string): void {
        this.telefoon = telefoon;
    }

    public setHoofdleiding(hoofdleiding: boolean): void {
        this.hoofdleiding = hoofdleiding;
    }

    public setTotem(totem: string): void {
        this.totem = totem;
    }

    public setGroep(groep: Groep): void {
        this.groep = groep;
    }

    equals(leiding: any): boolean {
        if (leiding === null) {
            return false;
        } else if (leiding === undefined) {
            return false;
        } else if (leiding instanceof Leiding) {
            return this.id === leiding.getId() && 
            this.naam === leiding.getNaam() && 
            this.voornaam === leiding.getVoornaam() && 
            this.email === leiding.getEmail() && 
            this.telefoon === leiding.getTelefoon() && 
            this.hoofdleiding === leiding.getHoofdleiding() &&
            this.totem === leiding.getTotem() 
        } else {
            return false;
        }
    }
}