import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import recipeService from "@services/recipeService";
import {Recipe} from "@types";
import Head from "next/head";
import RecipeDetailTable from "@components/recipes/RecipeDetail";
import Header from "@components/header";


const recipeDetailsPage: React.FC = () => {

    const [recipe, setRecipe] = useState<Recipe | null>(null)

    const router = useRouter()
    const {recipeId} = router.query

    const getRecipeById = async () => {
        try {
            const [recipeResponseJSON] = await Promise.all([
                recipeService.getRecipeById({id: recipeId as string})
            ])
            const [recipeResponse] = await Promise.all([
                recipeResponseJSON.json()
            ])
            console.log(recipeResponse)
            setRecipe(recipeResponse)
        } catch (error) {
            console.error('Error fetching recipe:', error);
        }
    }

    useEffect(() => {
        if (recipeId) {
            getRecipeById();
        }
    }, [recipeId]);


    return (
        <>
            <Head>
                <title>Owner info</title>
            </Head>
            <Header/>
            <main className="flex flex-col items-center justify-start pt-8">
                <h1 className="text-3xl font-bold mb-4">
                    info of {recipe && recipe._title}
                </h1>
                {recipe && (
                    <section>
                        <RecipeDetailTable recipe={recipe}/>
                    </section>
                )}
            </main>
        </>
    )
}

export default recipeDetailsPage