import React from 'react';
import { Cocktail } from '@types';

const imgStyle = {
  maxWidth: '300px',
  maxHeight: '300px',
  width: 'auto',
  height: 'auto',
  display: 'block',
  margin: '0 auto 16px'
};

type Props = {
  cocktail: Cocktail; 
};

const CocktailContainer: React.FC<Props> = ({ cocktail }) => {
  return (
    <div className="cocktail-container">
      <h3>{cocktail.name}</h3>
      <img src={cocktail.image} alt={cocktail.name} style={imgStyle} />
      <p><strong>Strongness :</strong> {cocktail.strongness}</p>
      <p><strong>Description :</strong> {cocktail.description}</p>
    </div>
  );
};

export default CocktailContainer;
