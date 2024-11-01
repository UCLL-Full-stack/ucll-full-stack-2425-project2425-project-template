// components/pokemons/AddPokemonModal.tsx
import React, { useState } from 'react';
import { Pokemon } from '@types'; // Make sure this points to the correct location
import styles from '../../styles/AddPokemonModal.module.css';

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
  const [canEvolve, setCanEvolve] = useState(false); // Add canEvolve state

  const handleAdd = () => {
    const newPokemon: Pokemon = {
      id: Math.random(), // Use a random ID or implement a better ID generation strategy
      name,
      type,
      health,
      stats,
      canEvolve: true, // Assuming new Pokémon can evolve, adjust as needed
    };
    onAddPokemon(newPokemon);
    onClose(); // Close the modal after adding
  };

  return (
    <div className={styles.modal}>
      <h2>Add Pokémon</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Type:
        <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
      </label>
      <label>
        Health:
        <input type="number" value={health} onChange={(e) => setHealth(Number(e.target.value))} />
      </label>
      <h3>Stats</h3>
      <label>
        HP:
        <input type="number" value={stats.hp} onChange={(e) => setStats({ ...stats, hp: Number(e.target.value) })} />
      </label>
      <label>
        Attack:
        <input type="number" value={stats.attack} onChange={(e) => setStats({ ...stats, attack: Number(e.target.value) })} />
      </label>
      <label>
        Defence:
        <input type="number" value={stats.defence} onChange={(e) => setStats({ ...stats, defence: Number(e.target.value) })} />
      </label>
      <label>
        Special Attack:
        <input type="number" value={stats.specialAttack} onChange={(e) => setStats({ ...stats, specialAttack: Number(e.target.value) })} />
      </label>
      <label>
        Special Defence:
        <input type="number" value={stats.specialDefence} onChange={(e) => setStats({ ...stats, specialDefence: Number(e.target.value) })} />
      </label>
      <label>
        Speed:
        <input type="number" value={stats.speed} onChange={(e) => setStats({ ...stats, speed: Number(e.target.value) })} />
      </label>
      <label>
        Can Evolve:
        <input type="checkbox" checked={canEvolve} onChange={(e) => setCanEvolve(e.target.checked)} />
      </label>
      <button onClick={handleAdd}>Add Pokémon</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddPokemonModal;
