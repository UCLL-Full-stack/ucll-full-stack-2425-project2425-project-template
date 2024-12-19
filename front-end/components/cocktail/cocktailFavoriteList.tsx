import React, { useEffect, useState } from 'react';
import CocktailContainer from './cocktailContainer';
import CocktailService from '@services/CocktailService';
import { Cocktail } from '@types';


type Props = {
    cocktails?: Array<Cocktail>;
  };
  
  const CocktailFavoriteList: React.FC<Props> = ({ cocktails}: Props) => {
    const [cocktailData, setCocktails] = useState<Array<Cocktail>>([]);
  
    useEffect(() => {
      const fetchCocktails = async () => {
        try {
          const response = await CocktailService.getAllFavoriteCocktails();
          const retrievedCocktails = await response.json();
          setCocktails(retrievedCocktails);
        } catch (error) {
          console.error("Failed to fetch favorite cocktails:", error);
        }
      };
      fetchCocktails();
    }, []);

    return (
        <div className="cocktail-list">
          {cocktailData.map((cocktail) => (
            <CocktailContainer key={cocktail.id} cocktail={cocktail} />
          ))}
        </div>
      );
      
};

export default CocktailFavoriteList;
