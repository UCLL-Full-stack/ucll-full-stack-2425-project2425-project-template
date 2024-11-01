// components/pokemons/pokemonDetail.tsx
import React from 'react';
import { Pokemon } from '@types';
import styles from '../../styles/pokemon.module.css'; // Import the styles

interface PokemonDetailsProps {
  pokemon: Pokemon;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon }) => {
  return (
    <div className={styles.card}>
      <h3>Details for {pokemon.name}</h3>
      <p>Type: {pokemon.type}</p>
      <p>Health: {pokemon.health}</p>
      <p>Stats:</p>
      <ul>
        <li>HP: {pokemon.stats.hp}</li>
        <li>Attack: {pokemon.stats.attack}</li>
        <li>Defence: {pokemon.stats.defence}</li>
        <li>Special Attack: {pokemon.stats.specialAttack}</li>
        <li>Special Defence: {pokemon.stats.specialDefence}</li>
        <li>Speed: {pokemon.stats.speed}</li>
      </ul>
    </div>
  );
};

export default PokemonDetails;
