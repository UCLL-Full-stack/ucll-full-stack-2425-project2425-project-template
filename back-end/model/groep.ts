import { Activiteit } from "./activiteit";
import { Leiding } from "./leiding";

export class Groep {
    private id?: number;
    private naam: string;
    private activiteiten?: Activiteit[];
    private leiding?: Leiding[];

    constructor(groep:{
        id?: number,
        naam: string
        activiteiten?: Activiteit[]
        leiding?: Leiding[]
    }) {
        this.id = groep.id;
        this.naam = groep.naam;
        this.activiteiten = groep.activiteiten;
        this.leiding = groep.leiding;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getNaam(): string {
        return this.naam;
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

    equals(groep: any): boolean {
        if (groep === null) {
            return false;
        }
        if (this.id === groep.id && this.naam === groep.naam) {
            return true;
        }
        return false;
    }
}