import { Cocktail, Ingredient } from '@types';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CocktailIngredientService } from '@services/CocktailIngredientsService';
import { IngredientService } from '@services/IngredientService';
import CocktailService from '../../services/CocktailService';
import UserService from '../../services/UserService';

type Props = {
  cocktail: Cocktail;
};

const imgStyle = {
  maxWidth: '550px',
  maxHeight: '400px',
  width: 'auto',
  height: 'auto',
  display: 'block',
  margin: '0 auto 16px',
};

const CocktailDetails: React.FC<Props> = ({ cocktail }: Props) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientNames, setIngredientNames] = useState<{ [key: number]: string }>({});
  const [author, setAuthor] = useState<string>('');
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

    const payload = sessionStorage.getItem('loggedInUser');
    const parsedUser = payload ? JSON.parse(payload) : null;
    console.log(parsedUser);
    
    if (parsedUser && parsedUser.userId) {
      const fetchUser = async () => {
        try {
          const user = await UserService.getUserById(parseInt(parsedUser.userId));
          const userData = await user.json();
          setAuthor(userData.name);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
    }

    fetchIngredients();
  }, [cocktail.id]);

  const handleDelete = async () => {
    try {
      await CocktailService.deleteCocktail(cocktail.id.toString());
      router.push('/cocktails');
    } catch (error) {
      console.error("Error deleting cocktail:", error);
    }
  };

  return (
    <div>
      <h1>{cocktail.name}</h1>
      <p>{cocktail.description}</p>
      <p>Strongness: {cocktail.strongness}</p>
      <p><strong>Author: </strong>{author}</p>
      <img src={cocktail.image} alt={cocktail.name} style={imgStyle} />
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredientNames[ingredient.ingredientId]} - {ingredient.amount}
          </li>
        ))}
      </ul>
      <button onClick={handleDelete} className="delete-btn">Delete Cocktail</button>
    </div>
  );
};

export default CocktailDetails;
