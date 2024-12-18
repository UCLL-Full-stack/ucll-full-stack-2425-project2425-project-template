import Header from "@/components/header";
import AddIngredient from "@/components/ingredienten/AddIngredient";
import Head from "next/head";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AddNewIngredient: React.FC = () => {
    const { t } = useTranslation();

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
};

export const getServerSideProps = async (context: { locale: any; }) => {
    const { locale } = context;
  
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};
  
export default AddNewIngredient;