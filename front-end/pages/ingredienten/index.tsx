import Header from "@/components/header";
import IngredientenOverzicht from "@/components/ingredienten/IngredientenOverzicht";
import IngredientenService from "@/services/IngredientService";
import { Ingredient } from "@/types";
import Head from "next/head";
import router from "next/router";
import { useEffect, useState } from "react";

const Ingredienten: React.FC = () => {
    const [ingredienten, setIngredienten] = useState<Array<Ingredient>>();

    const getIngredienten = async () => {
        const response = await IngredientenService.getAllIngredienten();
        const ingredienten = await response.json();
        setIngredienten(ingredienten);
    }

    useEffect(() => {
        getIngredienten();
    }, []);

    return (
        <>
            <Head>
                <title>Ingredienten</title>
                <meta name="description" content="BowlBuddies Pokebowl Ingredienten" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="assets/logo.png" />
            </Head>
            <Header />
            <main>
                <h1>Ingredienten</h1>
                <p>Lijst van alle ingredienten</p>
                <section>
                    {ingredienten && (
                        <IngredientenOverzicht ingredienten={ingredienten} />
                    )}
                </section>
                <button onClick={() => { router.push(`/ingredienten/add-ingredient`); }}>Add new ingredient</button>
            </main>
        </>
    );
};

export default Ingredienten