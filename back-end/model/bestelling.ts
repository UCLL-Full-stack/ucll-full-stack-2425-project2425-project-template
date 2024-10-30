export class Bestelling{
    private id?: number;
    private datum: Date;
    private totaalPrijs?: number;
   // private pokebowls: Pokebowl[];

    constructor(bestelling: {
        id?:number;
        datum: Date;
        totaalPrijs?: number;
        //pokebowls: Pokebowl[];
    }){
        this.id = bestelling.id;
        this.datum = bestelling.datum;
        this.totaalPrijs = bestelling.totaalPrijs;
        //this.pokebowls = order.pokebowls;
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

/*     addPokebowl(Pokebowl: Pokebowl){
        this.pokebowls.push(Pokebowl);
        this.calculateTotaalPrijs();
    } */

/*     removePokebowl(pokebowl: Pokebowl) {
        this.pokebowls = this.pokebowls.filter(p => p !== pokebowl);
        this.calculateTotaalPrijs();
    } */

/*     calculateTotaalPrijs(){
        this.totaalPrijs = this.pokebowls.reduce((total, pokebowl) => total + pokebowl.getPrijs(), 0)
    } */

}