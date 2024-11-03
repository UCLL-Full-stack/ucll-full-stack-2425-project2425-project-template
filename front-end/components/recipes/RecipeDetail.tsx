import React from "react";
import { Recipe } from "../../types";
import Header from "../header";

type Props = {
  recipe: Recipe;
};

const RecipeDetails: React.FC<Props> = ({ recipe }: Props) => {
  return (
    <>
      {recipe && (
        <table>
          <tbody>
            <tr>
              <td>ID:</td>
              <td>{recipe.id}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>{recipe.name}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>{recipe.description}</td>
            </tr>
            <tr>
              <td>Ingredients:</td>
              <td>
                <ul>
                  {Array.isArray(recipe.ingredients) &&
                  recipe.ingredients.length > 0 ? (
                    recipe.ingredients.map((ingredient) => (
                      <li key={ingredient.id}>
                        {ingredient.name} of Ingredient ID: {ingredient.id}
                      </li>
                    ))
                  ) : (
                    <li>No ingredients available</li>
                  )}
                </ul>
              </td>
            </tr>
            <tr>
              <td>Reviews:</td>
              <td>
                {recipe.reviews.length > 0
                  ? recipe.reviews.join(", ")
                  : "No reviews"}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default RecipeDetails;
