
import React from 'react';
import { Pokemon } from '@types';
import { useTranslation } from 'react-i18next';

interface PokemonOverviewTableProps {
  pokemon: Pokemon[];
  selectPokemon: (pokemon: Pokemon) => void;
}

const PokemonOverviewTable: React.FC<PokemonOverviewTableProps> = ({ pokemon, selectPokemon }) => {

  const { t } = useTranslation();

  return (
    <table className="table">
      <thead>
        <tr>
          <th>{t("pokemon.name")}</th>
          <th>{t("pokemon.type")}</th>
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
