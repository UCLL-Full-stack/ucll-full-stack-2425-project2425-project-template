export class Bestelling{
    private id?: number;
    private datum: Date;
    private totaalPrijs?: number;

    constructor(bestelling: {
        id?:number;
        datum: Date;
        totaalPrijs?: number;
    }){
        this.id = bestelling.id;
        this.datum = bestelling.datum;
        this.totaalPrijs = bestelling.totaalPrijs;
    }

    getId(): number | undefined {
        return this.id;
    }

    getDatum(): Date{
        return this.datum;
    }

    getTotaalPrijs(): number | undefined{
        return this.totaalPrijs;
    }
}