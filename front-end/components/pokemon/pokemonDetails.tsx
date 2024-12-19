import React from 'react';
import { Pokemon } from '@types';
import TrainerService from '../../services/trainer.service';
import styles from '../../styles/pokemon.module.css';

interface PokemonDetailsProps {
  pokemon: Pokemon;
  nurseId: number;
  reload: (boolean:boolean) => void;
  update: boolean;
  clearSelected: (pokemon:Pokemon | null)=>void;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({
  pokemon,
  nurseId,
  reload,
  update,
  clearSelected
}) => {
  const handleTransfer = async () => {
    if (pokemon.id === undefined) {
      alert('Pokémon ID is missing. Cannot send to hospital.');
      return;
    }

    try {
      await TrainerService.transferPokemonToNurse(pokemon.id, nurseId);
      alert(`${pokemon.name} has been sent to the hospital.`);
      reload(!update);
      clearSelected(null);
    } catch (error: any) {
      alert(error.message || 'Failed to transfer Pokémon.');
    }
  };

  return (
    <div className={styles.card}>
      <h3>Details for {pokemon.name}</h3>
      <p>Type: {pokemon.type}</p>
      <div className={styles.healthContainer}>
        <p>
          Health: {pokemon.health} / {pokemon.stats.hp}
          {pokemon.health < pokemon.stats.hp && (
            <button className={styles.healButton} onClick={handleTransfer}>
              Send to Hospital
            </button>
          )}
        </p>
      </div>
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
