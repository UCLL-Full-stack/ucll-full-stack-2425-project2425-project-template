import React from 'react';
import { Recipe } from '../../types';

type Props = {
  recipes: Array<Recipe>;
  selectRecipe: (recipe: Recipe) => void; // Function to select a recipe
};

const RecipeOverviewTable: React.FC<Props> = ({ recipes, selectRecipe }: Props) => {
  return (
    <>
      {recipes && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe, index) => (
              <tr
                key={index}
                onClick={() => selectRecipe(recipe)}
                role="button"
              >
                <td>{recipe.name}</td>
                <td>{recipe.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default RecipeOverviewTable;
