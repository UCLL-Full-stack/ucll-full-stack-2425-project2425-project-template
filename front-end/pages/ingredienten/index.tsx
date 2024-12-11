import Header from "@/components/header";
import IngredientenOverzicht from "@/components/ingredienten/IngredientenOverzicht";
import IngredientenService from "@/services/IngredientService";
import { Ingredient, User } from "@/types";
import Head from "next/head";
import router from "next/router";
import { useEffect, useState } from "react";

const Ingredienten: React.FC = () => {
    const [ingredienten, setIngredienten] = useState<Array<Ingredient>>();
    const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>();
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [error, setError] = useState<string>();

    const getIngredienten = async () => {
        setError("");
        const response = await IngredientenService.getAllIngredienten();
        if (response.ok) {
            const ingredienten = await response.json();
            setIngredienten(ingredienten);
        } else {
            setError("Unauthorized Access");
        }

    }

    useEffect(() => {
        const getUser = sessionStorage.getItem("loggedInUser")
        if (getUser) {
            const parsedUser = JSON.parse(getUser);
            setLoggedInUser(parsedUser as User);
        }
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
                    {error && <p className="error-field">{error}</p>}
                    {ingredienten && (
                        <IngredientenOverzicht ingredienten={ingredienten} selectIngredient={setSelectedIngredient} />
                    )}
                    {!error && (<button onClick={() => { router.push(`/ingredienten/add-ingredient`); }}>Add new ingredient</button>)}
                </section>
            </main>
        </>
    );
};

export default Ingredienten