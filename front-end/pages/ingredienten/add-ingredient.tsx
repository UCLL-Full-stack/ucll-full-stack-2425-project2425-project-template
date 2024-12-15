import Header from "@/components/header";
import AddIngredient from "@/components/ingredienten/AddIngredient";
import Head from "next/head";

const AddNewIngredient: React.FC = () => {
    return (
        <>
            <Head>
                <title>Add new ingredient</title>
                <meta name="description" content="BowlBuddies Pokebowl Ingredienten" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="assets/logo.png" />
            </Head>
            <Header />
            <main>
                <h1>New ingredient</h1>
                <section>
                    <AddIngredient />
                </section>
            </main>
        </>
    )
}
export default AddNewIngredient;