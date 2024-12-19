import { Leiding } from "./leiding";

export class Nieuwsbericht {
    private id: number;
    private titel: string;
    private inhoud: string;
    private datum: Date;
    private auteur: number;

    constructor(nieuwsbericht:{
        id: number,
        titel: string,
        inhoud: string,
        datum: Date,
        auteur: number
    }) {
        this.id = nieuwsbericht.id;
        this.titel = nieuwsbericht.titel;
        this.inhoud = nieuwsbericht.inhoud;
        this.datum = nieuwsbericht.datum;
        this.auteur = nieuwsbericht.auteur;
    }

    public getId(): number{
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

    public getAuteur(): number {
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

    public setAuteur(auteur: number): void {
        this.auteur = auteur;
    }

    public static from({
        id,
        titel,
        inhoud,
        datum,
        auteurId
    }: {
        id: number,
        titel: string,
        inhoud: string,
        datum: Date,
        auteurId: number
    }): Nieuwsbericht {
        return new Nieuwsbericht({
            id,
            titel,
            inhoud,
            datum,
            auteur: auteurId
        });
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

export class PublicNieuwsbericht{
    private id: number;
    private titel: string;
    private inhoud: string;
    private datum: Date;
    private auteur: string;

    constructor(nieuwsbericht:{
        id: number,
        titel: string,
        inhoud: string,
        datum: Date,
        auteur: string
    }) {
        this.id = nieuwsbericht.id;
        this.titel = nieuwsbericht.titel;
        this.inhoud = nieuwsbericht.inhoud;
        this.datum = nieuwsbericht.datum;
        this.auteur = nieuwsbericht.auteur;
    }

    static from({nieuwsbericht, auteur}: {nieuwsbericht: Nieuwsbericht, auteur: string}): PublicNieuwsbericht {
        return new PublicNieuwsbericht({
            id: nieuwsbericht.getId(),
            titel: nieuwsbericht.getTitel(),
            inhoud: nieuwsbericht.getInhoud(),
            datum: nieuwsbericht.getDatum(),
            auteur: auteur
        });
    }
}