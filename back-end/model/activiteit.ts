export class Activiteit {
    private id?: number;
    private naam: string;
    private beschrijving: string;
    private begindatum: Date;
    private einddatum: Date;

    constructor(activiteit:{
        id: number,
        naam: string,
        beschrijving: string,
        begindatum: Date,
        einddatum: Date
    }) {
        this.id = activiteit.id;
        this.naam = activiteit.naam;
        this.beschrijving = activiteit.beschrijving;
        this.begindatum = activiteit.begindatum;
        this.einddatum = activiteit.einddatum;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getNaam(): string {
        return this.naam;
    }

    public getBeschrijving(): string {
        return this.beschrijving;
    }

    public getBegindatum(): Date {
        return this.begindatum;
    }

    public getEinddatum(): Date {
        return this.einddatum;
    }

    public setNaam(naam: string): void {
        this.naam = naam;
    }

    public setBeschrijving(beschrijving: string): void {
        this.beschrijving = beschrijving;
    }

    public setBegindatum(begindatum: Date): void {
        this.begindatum = begindatum;
    }

    public setEinddatum(einddatum: Date): void {
        this.einddatum = einddatum;
    }

    public static from({
        id,
        naam,
        beschrijving,
        begindatum,
        einddatum
    }:{
        id: number,
        naam: string,
        beschrijving: string,
        begindatum: Date,
        einddatum: Date
    }): Activiteit {
        return new Activiteit({
            id,
            naam,
            beschrijving,
            begindatum,
            einddatum
        });
    }

    equals(activiteit: any): boolean {
        if (activiteit === null) {
            return false;
        } else if (activiteit === undefined) {
            return false;
        } else if (activiteit instanceof Activiteit) {
        return this.naam === activiteit.getNaam() &&
            this.beschrijving === activiteit.getBeschrijving() &&
            this.begindatum === activiteit.getBegindatum() &&
            this.einddatum === activiteit.getEinddatum();
        } else {
            return false;
        }
    }
}