import { RecipeIngredient as RecipeIngredientPrisma, Recipe as RecipePrisma, Review as ReviewPrisma, User as UserPrisma } from '@prisma/client';
import { User } from './User';
import { Review } from './Review';

export class Recipe {
    readonly id?: number;
    readonly name: string;
    readonly description: string;
    readonly recipeIngredients: RecipeIngredientPrisma[];
    readonly creator?: User;
    readonly reviews?: Review[];

    constructor(data: {
        id?: number;
        name: string;
        description: string;
        recipeIngredients: RecipeIngredientPrisma[];
        creator?: User;
        reviews?: Review[];
    }) {
        this.validate(data);
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.recipeIngredients = data.recipeIngredients || [];
        this.creator = data.creator;
        this.reviews = data.reviews || [];
    }

    private validate(data: {
        name: string;
        description: string;
        recipeIngredients: RecipeIngredientPrisma[];
    }) {
        if (!data.name) {
            throw new Error('Recipe name is required');
        }
        if (data.name.length < 3) {
            throw new Error('Recipe name must be at least 3 characters long');
        }
        if (!data.description) {
            throw new Error('Description is required');
        }
        data.recipeIngredients.forEach((ingredient) => {
            if (!ingredient.amount) {
                throw new Error('Ingredient amount is required');
            }
            if (!ingredient.measurementType) {
                throw new Error('Ingredient measurement type is required');
            }
        });
    }

    equals(recipe: Recipe): boolean {
        return this.name === recipe.name && this.description === recipe.description;
    }

    static from = ({
        id,
        name,
        description,
        recipeIngredients,
        creator,
        reviews,
    }: RecipePrisma & {
        recipeIngredients: RecipeIngredientPrisma[];
        creator?: UserPrisma & {
            recipes?: RecipePrisma[];
            reviews?: ReviewPrisma[];
        };
        reviews?: ReviewPrisma & {
            writer: UserPrisma;
            recipe: RecipePrisma;
        }
    }): Recipe => {
        return new Recipe({
            id,
            name,
            description,
            recipeIngredients,
            creator: creator ? User.from(creator),
            reviews: reviews?.map((review) => Review.from(review)),
        });
    };
    // } 
    // Recipe => {
    //     return new Recipe({
    //         id: recipePrisma.id,
    //         name: recipePrisma.name,
    //         description: recipePrisma.description,
    //         recipeIngredients: recipePrisma.ingredients, // Adjust to correct field
    //         creator: recipePrisma.creator,
    //         reviews: recipePrisma.reviews,
    //     });
    // };
}
