import Header from "@/components/header";
import PokebowlAanmaken from "@/components/pokebowls/PokebowlAanmaken";
import IngredientenService from "@/services/IngredientService";
import Head from "next/head";
import useSWR from "swr";

const AddNewPokebowl: React.FC = () => {

    const getIngredienten = async () => {
        const responses = await Promise.all([
            IngredientenService.getAllIngredienten()
        ]);

        const [ingredientResponse] = responses;

        if (ingredientResponse.ok) {
            const ingredienten = await ingredientResponse.json();
            return { ingredienten }
        }
    }

    const { data, isLoading, error } = useSWR(
        "ingredienten",
        getIngredienten
    );

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
                    {error && <div className="error-field">{error}</div>}
                    {isLoading && <p className="text-green-800">Loading...</p>}
                    {data && <PokebowlAanmaken ingredienten={data.ingredienten} />}
                </section>
            </main>
        </>
    )
}
export default AddNewPokebowl;