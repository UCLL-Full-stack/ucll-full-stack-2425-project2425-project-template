import React from "react";
import RecipeCard from './RecipeCard';
import {Recipe} from "@types";



interface Props {
    recipes: Array<Recipe>;
}

const RecipeGrid: React.FC<Props> = ({ recipes }:Props) => {
    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-[5%]">
            {recipes.map((recipe: Recipe) => (
                <RecipeCard
                    key={recipe.recipeId}
                    recipe={recipe}
                />
            ))}
        </div>
    );
};

export default RecipeGrid;