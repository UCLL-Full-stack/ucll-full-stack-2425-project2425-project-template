export type Cocktail = {
    id: number;
    name: string;
    description: string;
    strongness: number;
    image: string;
    authorId: number;
}

export type Ingredient = {
    id: number;          
    cocktailId: number;   
    ingredientId: number;
    amount: string;       
}

export type CocktailIngredient = {
    ingredientId: number;
    amount: string;
};

export type User = {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
};

export type StatusMessage = {
    message: string;
    type: "error" | "success";
};