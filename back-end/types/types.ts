export type User = {
    id?: number;
    name: string;
    password: string;
    email: string;
    role: string;

};

export type UserInput = {
  id?: number;
  name?: string;
  password?: string;
  email?: string;
  role?: string;
};

export type Cocktail = {
    id?: number;
    name: string;
    description: string;
    strongness: number;
    image: string;
  };
  
export type Ingredient = {
    id?: number;
    name: string;
  };
  
export type CocktailIngredient = {
    id?: number;
    cocktailId: number;   // Foreign key to Cocktail
    ingredientId: number; // Foreign key to Ingredient
    amount: string;
  };

export type AuthenticationResponse = {
    token: string;
    email: string;
    userId: number;
    role: string;
};