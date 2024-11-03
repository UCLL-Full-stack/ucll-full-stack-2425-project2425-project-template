import Header from "../../components/header";
import RecipeOverviewTable from "../../components/recipes/RecipeOverviewTable";
import RecipeService from "../../services/RecipeService";
import { Recipe } from "../../types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Recipes: React.FC = () => {
  const [recipes, setRecipe] = useState<Array<Recipe>>([]);

  const getRecipes = async () => {
    const response = await RecipeService.getAllRecipes();
    const data = await response.json();
    setRecipe(data);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      <Head>
        <title>Recipes</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>recipes</h1>
        <section>
          <h2>recipes overview</h2>
        </section>
        {recipes.length > 0 ? (
          <RecipeOverviewTable recipes={recipes} />
        ) : (
          <p>No recipes available</p>
        )}
      </main>
    </>
  );
};
export default Recipes;
