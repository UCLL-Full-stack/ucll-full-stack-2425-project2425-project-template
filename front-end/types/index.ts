export type Ingredient = {
    id?: number,
    naam: string,
    type: string,
    aantal: number,
    prijs: number
}

export type Pokebowl = {
    id?: number,
    naam: string,
    type: string,
    beschrijving: string,
    prijs?: number,
    maxAantalIngredienten: number,
    ingredienten: Ingredient[],
    getPrijs(): number
}