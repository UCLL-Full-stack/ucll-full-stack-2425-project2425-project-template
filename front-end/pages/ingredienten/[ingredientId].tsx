import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Ingredient } from '@/types';
import Header from '@/components/header';
import IngredientenService from '@/services/IngredientService';
import IngredientInfo from '@/components/ingredienten/IngredientInfo';

const IngredientId = () => {
    const [ingredient, setIngredient] = useState<Ingredient | null>(null);
    const router = useRouter();
    const { ingredientId } = router.query;

    const getIngredientById = async () => {
        const response = await IngredientenService.getIngredientById(ingredientId as string);
        const result = await response.json();
        setIngredient(result);
    }

    useEffect(() => {
        if (ingredientId) {
            getIngredientById();
        }
    }, [ingredientId]);

    return (
        <>
            <Head>
                <title>Pokebowl info </title>
            </Head>
            <Header />
            <main>
                <h1>Ingredient: {ingredient && ingredient.naam}</h1>
                <section>
                    {!ingredientId && <p>Loading ingredient info...</p>}
                    {ingredientId && <IngredientInfo ingredient={ingredient} />}
                </section>
            </main>
        </>
    );
};

export default IngredientId;