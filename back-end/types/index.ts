type UserSignupInput = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
};

type UserLoginInput = {
    username: string;
    password: string;
};

type ProfileUpdateInput = {
    firstName: string;
    lastName: string;
    email: string;
};

type IngredientCategory =
    | 'Produce' // Combines Vegetables & Fruits
    | 'Meat & Fish' // Combines Meats & Seafood
    | 'Dairy & Eggs'
    | 'Pantry' // Combines Grain, Pasta, Canned, Baking, Spices, Oils
    | 'Snacks'
    | 'Beverages'
    | 'Frozen'
    | 'Other';

export { IngredientCategory, UserSignupInput, UserLoginInput, ProfileUpdateInput };
