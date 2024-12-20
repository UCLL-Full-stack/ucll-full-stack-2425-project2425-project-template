import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from "@components/header";
import Head from "next/head";
import CocktailService from "@services/CocktailService";
import { Cocktail } from "@types";
import CocktailDetails from '@components/cocktail/cocktailDetails';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import UserAuthorisation from '@components/users/UserAuthorisation';

const CocktailDetailsPage: React.FC = () => {
      const {t} = useTranslation()
    

    const router = useRouter();
    const [cocktail, setCocktail] = useState<Cocktail | null>(null);
    const { cocktailId } = router.query;

    useEffect(() => {
        const fetchCocktail = async () => {
            try {
                const response = await CocktailService.getCocktailById(Number(cocktailId));
                const retrievedCocktail: Cocktail = await response.json();
                setCocktail(retrievedCocktail);
            } catch (error) {
                console.error("Failed to fetch cocktail:", error);
            }
        };
        if (cocktailId) {
            fetchCocktail();
        }
    }, [cocktailId]);

    return (
        <>
        <Head>
            <title>Cocktail Details</title>
        </Head>
        <Header></Header>
        <main>
        <UserAuthorisation>
            <div>

            {cocktail && <CocktailDetails cocktail={cocktail} />}  

             </div>
        </UserAuthorisation>    
        </main>
        
        </>
);
};

export const getServerSideProps = async (context: { locale: any; }) => {
    const { locale } = context;
  
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
  }; 
  

export default CocktailDetailsPage;


