// components/trainers/TrainerDetails.tsx

import React from 'react';
import { Trainer } from '@types';

type Props = {
  trainer: Trainer;
};

const TrainerDetails: React.FC<Props> = ({ trainer }) => {
  return (
    <div>
      <h2>Selected Trainer Details:</h2>
      <table>
        <tbody>
          <tr>
            <td>ID:</td>
            <td>{trainer.id}</td>
          </tr>
          <tr>
            <td>Firstname:</td>
            <td>{trainer.user.firstName}</td>
          </tr>
          <tr>
            <td>Lastname:</td>
            <td>{trainer.user.lastName}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{trainer.user.email}</td>
          </tr>
          <tr>
            <td>Pokémon:</td>
            <td>
              {trainer.pokemon.length > 0 ? (
                trainer.pokemon.map((pokemon) => (
                  <div key={pokemon.id}>{pokemon.name} (Type: {pokemon.type})</div>
                ))
              ) : (
                <span>No Pokémon assigned.</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TrainerDetails;
