import { Cocktail } from '@types';
import React from 'react';

type Props = {
    cocktail: Cocktail;
}
const imgStyle = {
    maxWidth: '300px',
    maxHeight: '300px',
    width: 'auto',
    height: 'auto',
    display: 'block',
    margin: '0 auto 16px'
  };

const CocktailDetails: React.FC<Props> = ({ cocktail }: Props) => {
    return (
        <>
        <div className="cocktail-container">
            <h3>{cocktail.name}</h3>
            <img src={cocktail.image} alt={cocktail.name} style={imgStyle} />
            <p><strong>Strongness :</strong> {cocktail.strongness}</p>
            <p><strong>Description :</strong> {cocktail.description}</p>
            <table>
                <thead>
                    <tr>
                        <th>Ingredient</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {cocktail.ingredientsList.map((ingredient, index) => (
                        <tr key={index}>
                            <td>{ingredient.name}</td>
                            <td>{ingredient.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        
        </>
        );
    }

export default CocktailDetails;