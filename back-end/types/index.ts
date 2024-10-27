
type IngredientInput = {
    id?: number,
    naam: string,
    type: string,
    aantal: number,
    prijs: number
};

type PokebowlInput = {
    id?: number,
    naam: string,
    type: string,
    beschrijving: string,
    maxAantalIngredienten: number,
    ingredienten: IngredientInput[]
}

export {
    IngredientInput,
    PokebowlInput
}