import Head from "next/head";
import Header from "@components/header";
import RecipeOverviewGrid from "@components/recipes/RecipeOverviewGrid";
import recipeService from "@services/recipeService";
import {useEffect, useState} from "react";
import {Recipe} from "@types";

const RecipeOverview: React.FC = () => {

    const [recipes, setRecipes] = useState<Recipe[] | null>(null)

    const getRecipes = async () => {
        const response = await recipeService.getAllRecipes();
        if (!response.ok) {
            return null
        }
        const recipesRes = await response.json()
        console.info(recipesRes)
        setRecipes(recipesRes)
    }

    useEffect(() => {
        getRecipes()
    }, [])

    return (
        <>
            <Head>
                <title>Recipes</title>
            </Head>
            <Header/>
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Recipes</h1>
            </main>
            <section>
                { recipes && (
                    <RecipeOverviewGrid
                        recipes ={recipes}
                    />
                )}
            </section>
        </>
    )
}
export default RecipeOverview;