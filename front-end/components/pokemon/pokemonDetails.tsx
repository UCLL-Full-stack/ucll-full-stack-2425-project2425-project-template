import React from 'react';
import { Pokemon } from '@types';
import TrainerService from '../../services/trainer.service';
import styles from '../../styles/pokemon.module.css';
import { useTranslation } from 'next-i18next';
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
  const { t } = useTranslation();

  const handleTransfer = async () => {
    if (pokemon.id === undefined) {
      alert('Pokémon ID is missing. Cannot send to hospital.');
      return;
    }

    try {
      await TrainerService.transferPokemonToNurse(pokemon.id, nurseId);
      alert(`${pokemon.name} ${t('pokemon.has-been-send-to-hospital')}`);
      reload(!update);
      clearSelected(null);
    } catch (error: any) {
      alert(error.message || 'Failed to transfer Pokémon.');
    }
  };

  return (
    <div className={styles.card}>
      <h3>{t("pokemon.details")} {pokemon.name}</h3>
      <p>{t("pokemon.type")}: {pokemon.type}</p>
      <div className={styles.healthContainer}>
        <p>
          {t("pokemon.health")} {pokemon.health} / {pokemon.stats.hp}
          {pokemon.health < pokemon.stats.hp && (
            <button className={styles.healButton} onClick={handleTransfer}>
              {t("pokemon.send-to-hospital")}
            </button>
          )}
        </p>
      </div>
      <p>{t("pokemon.stats")}</p>
      <ul>
        <li>{t("pokemon.hp")} {pokemon.stats.hp}</li>
        <li>{t("pokemon.attack")} {pokemon.stats.attack}</li>
        <li>{t("pokemon.defence")} {pokemon.stats.defence}</li>
        <li>{t("pokemon.special-attack")} {pokemon.stats.specialAttack}</li>
        <li>{t("pokemon.special-defence")} {pokemon.stats.specialDefence}</li>
        <li>{t("pokemon.speed")} {pokemon.stats.speed}</li>
      </ul>
    </div>
  );
};

export default PokemonDetails;
