import { Leiding } from "./leiding";

export class Nieuwsbericht {
    private id?: number;
    private titel: string;
    private inhoud: string;
    private datum: Date;
    private auteur: Leiding;

    constructor(nieuwsbericht:{
        id?: number,
        titel: string,
        inhoud: string,
        datum: Date,
        auteur: Leiding
    }) {
        this.id = nieuwsbericht.id;
        this.titel = nieuwsbericht.titel;
        this.inhoud = nieuwsbericht.inhoud;
        this.datum = nieuwsbericht.datum;
        this.auteur = nieuwsbericht.auteur;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getTitel(): string {
        return this.titel;
    }

    public getInhoud(): string {
        return this.inhoud;
    }

    public getDatum(): Date {
        return this.datum;
    }

    public getAuteur(): Leiding {
        return this.auteur;
    }

    public setTitel(titel: string): void {
        this.titel = titel;
    }

    public setInhoud(inhoud: string): void {
        this.inhoud = inhoud;
    }

    public setDatum(datum: Date): void {
        this.datum = datum;
    }

    public setAuteur(auteur: Leiding): void {
        this.auteur = auteur;
    }

    equals(nieuwsbericht: any): boolean {
        if (nieuwsbericht === null) {
            return false;
        } else if (nieuwsbericht === undefined) {
            return false;
        } else if (nieuwsbericht instanceof Nieuwsbericht) {
            return this.id === nieuwsbericht.getId() && 
                this.titel === nieuwsbericht.getTitel() &&
                this.inhoud === nieuwsbericht.getInhoud() &&
                this.datum === nieuwsbericht.getDatum()
        } else {
            return false;
        }
        
    }
}