type Type = "Protein" | "Topping" | "Sauce"

type IngredientInput = {
    id?: number,
    naam: string,
    type: Type,
    aantal: number,
    prijs: number
};

type PokebowlInput = {
    id?: number,
    naam: string,
    type: string,
    beschrijving: string,
    prijs?: number,
    maxAantalIngredienten: number,
    ingredienten: IngredientInput[]
}

export {
    Type,
    IngredientInput,
    PokebowlInput
}