
import React from 'react';
import { Pokemon } from '@types';

interface PokemonOverviewTableProps {
  pokemon: Pokemon[];
  selectPokemon: (pokemon: Pokemon) => void;
}

const PokemonOverviewTable: React.FC<PokemonOverviewTableProps> = ({ pokemon, selectPokemon }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {pokemon.map((p) => (
          <tr key={p.id} onClick={() => selectPokemon(p)}>
            <td>{p.name}</td>
            <td>{p.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PokemonOverviewTable;
