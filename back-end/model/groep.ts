import { Activiteit } from "./activiteit";
import { Leiding } from "./leiding";
import { 
    Activiteit as ActiviteitPrisma,
    Leiding as LeidingPrisma,
    Groep as GroepPrisma,
    Nieuwsbericht as NieuwsberichtPrisma,
}  from "@prisma/client";

export class Groep {
    private id: number;
    private naam: string;
    private beschrijving: string;
    private activiteiten?: Activiteit[];
    private leiding?: Leiding[];

    constructor(groep:{
        id: number,
        naam: string
        beschrijving: string
        activiteiten?: Activiteit[]
        leiding?: Leiding[]
    }) {
        this.id = groep.id;
        this.naam = groep.naam;
        this.beschrijving = groep.beschrijving;
        this.activiteiten = groep.activiteiten;
        this.leiding = groep.leiding;
    }

    public getId(): number{
        return this.id;
    }

    public getNaam(): string {
        return this.naam;
    }

    public getBeschrijving(): string {
        return this.beschrijving;
    }

    public getActiviteiten(): Activiteit[] | undefined {
        return this.activiteiten;
    }

    public getLeiding(): Leiding[] | undefined {
        return this.leiding;
    }

    public setNaam(naam: string): void {
        this.naam = naam;
    }

    public addActiviteit(activiteit: Activiteit): void {
        if (this.activiteiten === undefined) {
            this.activiteiten = [];
        }
        if (this.activiteiten.includes(activiteit)) {
            return;
        }
        this.activiteiten.push(activiteit);
    }

    public removeActiviteit(activiteit: Activiteit): void {
        if (this.activiteiten === undefined) {
            return;
        }
        if (!this.activiteiten.includes(activiteit)) {
            return;
        }
        this.activiteiten = this.activiteiten.filter((a) => !a.equals(activiteit));
    } 

    public addLeiding(leiding: Leiding): void {
        if (this.leiding === undefined) {
            this.leiding = [];
        }
        if (this.leiding.includes(leiding)) {
            return;
        }
        this.leiding.push(leiding);
    }

    public removeLeiding(leiding: Leiding): void {
        if (this.leiding === undefined) {
            return;
        }
        if (!this.leiding.includes(leiding)) {
            return;
        }
        this.leiding = this.leiding.filter((l) => !l.equals(leiding));
    }

    static from({
        id,
        naam,
        beschrijving,
        activiteiten,
        leiding
        }: GroepPrisma & {
            activiteiten: ActiviteitPrisma[];
            leiding: LeidingPrisma[];
        }) {
        return new Groep({
            id,
            naam,
            beschrijving,
            activiteiten: activiteiten.map((activiteit) => Activiteit.from({
                ...activiteit,
                begindatum: activiteit.beginDatum,
                einddatum: activiteit.eindDatum
            })),
            leiding: leiding.map((l) => Leiding.from({ ...l, nieuwsberichten: [] }))
        });
    }

    equals(groep: any): boolean {
        if (groep === null) {
            return false;
        } else if (groep === undefined) {
            return false;
        } else if (groep instanceof Groep) {
            return this.naam === groep.naam && 
            this.beschrijving === groep.beschrijving && 
            this.activiteiten === groep.activiteiten && 
            this.leiding === groep.leiding;
        }
        return false;
    }
}