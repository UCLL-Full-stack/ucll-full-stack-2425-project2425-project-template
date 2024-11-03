import React, { useEffect, useState } from "react";
import RecipeOverviewTable from "../../components/recipes/RecipeOverviewTable";
import RecipeDetails from "../../components/recipes/RecipeDetail";
import RecipeService from "../../services/RecipeService";
import { Recipe } from "../../types";
import Head from "next/head";
import Header from "@/components/header";

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const getRecipes = async () => {
    const response = await RecipeService.getAllRecipes();
    const data = await response.json();
    setRecipes(data);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      <Head>
        <title>Recipes</title>
      </Head>
      <Header></Header>
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Recipes</h1>
        <section>
          <h2>Recipes Overview</h2>
        </section>
        {recipes.length > 0 ? (
          <RecipeOverviewTable
            recipes={recipes}
            selectRecipe={setSelectedRecipe}
          />
        ) : (
          <p>No recipes available</p>
        )}
        {selectedRecipe && (
          <>
            <h2>Details for {selectedRecipe.name}</h2>
            <RecipeDetails recipe={selectedRecipe} />
          </>
        )}
      </main>
    </>
  );
};

export default Recipes;
