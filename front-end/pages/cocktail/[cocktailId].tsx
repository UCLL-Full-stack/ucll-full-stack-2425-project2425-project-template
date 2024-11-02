import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from "@components/header";
import Head from "next/head";
import CocktailService from "@services/CocktailService";
import { Cocktail } from "@types";
import CocktailDetails from '@components/cocktail/CocktailDetails';

const CocktailDetailsPage: React.FC = () => {
    const router = useRouter();
    const [cocktail, setCocktail] = useState<Cocktail | null>(null);
    const { cocktailId } = router.query;

    useEffect(() => {
        const fetchCocktail = async () => {
            try {
                const retrievedCocktail = await CocktailService.getCocktailById(Number(cocktailId));
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
            {cocktail && <CocktailDetails cocktail={cocktail} />}      
        </main>
        
        </>
);
};

export default CocktailDetailsPage;


