import { Cocktail, Ingredient } from '@types';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CocktailIngredientService } from '@services/CocktailIngredientsService';
import { IngredientService } from '@services/IngredientService';
import CocktailService from '../../services/CocktailService';
import CocktailForm from '@components/cocktail/cocktailForm';

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
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const ingredientData = await CocktailIngredientService.getIngredientsByCocktailId(cocktail.id);
                setIngredients(ingredientData);

                const names: { [key: number]: string } = {};
                for (const ingredient of ingredientData) {
                    if (ingredient.ingredientId) {
                        const ingredientInfo = await IngredientService.getIngredientById(ingredient.ingredientId);
                        names[ingredient.ingredientId] = ingredientInfo.name;
                    }
                }
                setIngredientNames(names);
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            }
        };

        fetchIngredients();
    }, [cocktail.id]);

    const handleDelete = async () => {
        try {
            await CocktailService.deleteCocktail(cocktail.id.toString());
            router.push('/cocktails'); // Redirect to the cocktails list page after deletion
        } catch (error) {
            console.error("Error deleting cocktail:", error);
        }
    };

    const handleEdit = async (formData: any) => {
        try {
            await CocktailService.updateCocktail({ cocktailId: cocktail.id.toString(), ...formData });
            setIsEditing(false);
            router.reload(); // Reload the page to reflect the updated cocktail details
        } catch (error) {
            console.error("Error updating cocktail:", error);
        }
    };

    return (
        <div>
            {isEditing ? (
                <CocktailForm
                    initialData={cocktail}
                    onSubmit={handleEdit}
                    submitButtonText="Update Cocktail"
                />
            ) : (
                <>
                    <h1>{cocktail.name}</h1>
                    <p>{cocktail.description}</p>
                    <p>Strongness: {cocktail.strongness}</p>
                    <img src={cocktail.image} alt={cocktail.name} />
                    <h2>Ingredients</h2>
                    <ul>
                        {ingredients.map((ingredient) => (
                            <li key={ingredient.id}>
                                {ingredientNames[ingredient.ingredientId]} - {ingredient.amount}
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => setIsEditing(true)} className="edit-btn">Edit Cocktail</button>
                    <button onClick={handleDelete} className="delete-btn">Delete Cocktail</button>
                </>
            )}
        </div>
    );
};

export default CocktailDetails;