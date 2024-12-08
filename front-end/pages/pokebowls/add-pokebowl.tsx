import Header from "@/components/header";
import PokebowlAanmaken from "@/components/pokebowls/PokebowlAanmaken";
import IngredientenService from "@/services/IngredientService";
import { Ingredient } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const AddNewPokebowl: React.FC = () => {
    const [ingredienten, setIngredienten] = useState<Array<Ingredient>>([]);

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
                <title>Add new pokebowl</title>
                <meta name="description" content="BowlBuddies Pokebowl Ingredienten" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="assets/logo.png" />
            </Head>
            <Header />
            <main>
                <h1>New Pokebowl</h1>
                <section>
                    <PokebowlAanmaken ingredienten={ingredienten} />
                </section>
            </main>
        </>
    )
}
export default AddNewPokebowl;