import { Cocktail,Ingredient } from '@types';
import React, { useEffect, useState } from 'react';
import { CocktailIngredientService } from '@services/CocktailIngredientsService';
import { IngredientService } from '@services/IngredientService';

type Props = {
    cocktail: Cocktail;
};

const imgStyle = {
    maxWidth: '550px',
    maxHeight: '400px',
    width: 'auto',
    height: 'auto',
    display: 'block',
    margin: '0 auto 16px'
};

const CocktailDetails: React.FC<Props> = ({ cocktail }: Props) => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [ingredientNames, setIngredientNames] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const ingredientData = await CocktailIngredientService.getIngredientsByCocktailId(cocktail.id);
                setIngredients(ingredientData);
                
                const names: { [key: number]: string } = {};
                for (const ingredient of ingredientData) {
                    if (ingredient._ingredientId) {
                        const ingredientInfo = await IngredientService.getIngredientById(ingredient._ingredientId);
                        names[ingredient._ingredientId] = ingredientInfo.name;
                    } else {
                        console.error("Ingredient ID is undefined for ingredient:", ingredient);
                    }
                }
                setIngredientNames(names);
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            }
        };

        fetchIngredients();
    }, [cocktail.id]);

    return (
        <div className="cocktail-details">
            <h3>{cocktail.name}</h3>
            <img src={cocktail.image} alt={cocktail.name} style={imgStyle} />
            <p><strong>Strongness:</strong> {cocktail.strongness}</p>
            <p><strong>Description:</strong> {cocktail.description}</p>
            <table>
                <thead>
                    <tr>
                        <th>Ingredient</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients.map((ingredient) => (
                        <tr key={ingredient.id}>
                            <td>{ingredientNames[ingredient.id] || 'weer kapot'}</td>
                            <td>{ingredient.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CocktailDetails;