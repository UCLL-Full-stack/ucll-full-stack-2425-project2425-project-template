import React from 'react';
import { useRouter } from 'next/router';
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
  const router = useRouter();

  const handleClick = () => {
    router.push(`/cocktail/${cocktail.id}`);
  };

  return (
    <div className="cocktail-container" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h3>{cocktail.name}</h3>
      <img src={cocktail.image} alt={cocktail.name} style={imgStyle} />
      <p><strong>Strongness:</strong> {cocktail.strongness}</p>
      <p><strong>Description:</strong> {cocktail.description}</p>
    </div>
  );
};

export default CocktailContainer;
