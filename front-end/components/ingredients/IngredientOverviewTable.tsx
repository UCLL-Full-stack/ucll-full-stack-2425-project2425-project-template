import React, { useEffect, useState } from "react";
import { Ingredient } from "../../types";
import IngredientService from "../../services/IngredientService";

type Props = {
  ingredients: Array<Ingredient>;
};

const IngredientOverviewTable: React.FC<Props> = ({ ingredients }: Props) => {
  return (
    <>
      {ingredients && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient, index) => (
              <tr key={index} role="button">
                <td>{ingredient.name}</td>
                <td>{ingredient.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default IngredientOverviewTable;
