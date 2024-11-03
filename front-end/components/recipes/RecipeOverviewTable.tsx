import React, { useEffect, useState } from "react";
import { Recipe } from "../../types";
import RecipeService from "../../services/RecipeService";

type Props = {
  recipes: Array<Recipe>;
};

const RecipeOverviewTable: React.FC<Props> = ({ recipes }: Props) => {
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
              <tr key={index} role="button">
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
