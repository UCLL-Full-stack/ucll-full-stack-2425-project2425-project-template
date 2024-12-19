
import React, { useState } from 'react';
import { Pokemon } from '@types'; 
import styles from '../../styles/AddPokemonModal.module.css';
import { useTranslation } from 'next-i18next';

interface AddPokemonModalProps {
  onClose: () => void;
  onAddPokemon: (pokemon: Pokemon) => void;
}

const AddPokemonModal: React.FC<AddPokemonModalProps> = ({ onClose, onAddPokemon }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [health, setHealth] = useState(0);
  const [stats, setStats] = useState({
    hp: 0,
    attack: 0,
    defence: 0,
    specialAttack: 0,
    specialDefence: 0,
    speed: 0,
  });
  const [canEvolve, setCanEvolve] = useState(false); 

  const { t } = useTranslation();

  const handleAdd = () => {
    const newPokemon: Pokemon = {
      id: Math.random(), 
      name,
      type,
      health,
      stats,
      canEvolve: true, 
    };
    onAddPokemon(newPokemon);
    onClose(); 
  };

  return (
    <div className={styles.modal}>
      <h2>{t("pokemon.add")}</h2>
      <label>
        {t("pokemon.name")}:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        {t("pokemon.type")}:
        <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
      </label>
      <label>
        {t("pokemon.health")}
        <input type="number" value={health} onChange={(e) => setHealth(Number(e.target.value))} />
      </label>
      <h3>{t("pokemon.stats")}</h3>
      <label>
        {t("pokemon.hp")}
        <input type="number" value={stats.hp} onChange={(e) => setStats({ ...stats, hp: Number(e.target.value) })} />
      </label>
      <label>
        {t("pokemon.attack")}
        <input type="number" value={stats.attack} onChange={(e) => setStats({ ...stats, attack: Number(e.target.value) })} />
      </label>
      <label>
        {t("pokemon.defence")}
        <input type="number" value={stats.defence} onChange={(e) => setStats({ ...stats, defence: Number(e.target.value) })} />
      </label>
      <label>
        {t("pokemon.special-attack")}
        <input type="number" value={stats.specialAttack} onChange={(e) => setStats({ ...stats, specialAttack: Number(e.target.value) })} />
      </label>
      <label>
        {t("pokemon.special-defence")}
        <input type="number" value={stats.specialDefence} onChange={(e) => setStats({ ...stats, specialDefence: Number(e.target.value) })} />
      </label>
      <label>
        {t("pokemon.speed")}
        <input type="number" value={stats.speed} onChange={(e) => setStats({ ...stats, speed: Number(e.target.value) })} />
      </label>
      <label>
        {t("pokemon.evolve")}
        <input type="checkbox" checked={canEvolve} onChange={(e) => setCanEvolve(e.target.checked)} />
      </label>
      <button onClick={handleAdd}>{t("pokemon.add")}</button>
      <button onClick={onClose}>{t("pokemon.cancel")}</button>
    </div>
  );
};

export default AddPokemonModal;
