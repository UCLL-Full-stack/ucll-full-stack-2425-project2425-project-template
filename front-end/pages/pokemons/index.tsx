// pages/Pokemons.tsx
import React, { useEffect, useState } from 'react';
import Header from '@components/header';
import PokemonOverviewTable from '@components/pokemon/pokemonOverviewTable';
import TrainerService from '@services/trainer.service';
import { Pokemon, Trainer } from '@types';
import PokemonDetails from '@components/pokemon/pokemonDetails';
import TrainerOverviewTable from '@components/trainer/trainerOverviewTable';
import AddPokemonModal from '@components/pokemon/addPokemonModal';

const Pokemons: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTrainers = async () => {
    try {
      const allTrainers = await TrainerService.getAllTrainers();
      setTrainers(allTrainers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTrainers();
  }, []);

  const handleSelectTrainer = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
  };

  const handleSelectPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleAddPokemon = async (newPokemon: Pokemon) => {
    try {
      if (selectedTrainer != null && selectedTrainer.id != null) {
        const updatedTrainer = await TrainerService.addPokemonToTrainerById(selectedTrainer.id, newPokemon);
  
        // Update the selected trainer with the new Pokemon list
        setSelectedTrainer(updatedTrainer);
  
        // Update the trainers list with the modified trainer
        setTrainers(prevTrainers =>
          prevTrainers.map(trainer =>
            trainer.id === updatedTrainer.id ? updatedTrainer : trainer
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <Header />
      <main>
        <h1>Pokémon</h1>
        <TrainerOverviewTable trainers={trainers} selectTrainer={handleSelectTrainer} />

        {selectedTrainer && (
          <>
            <h2>{selectedTrainer.user.firstName}'s Pokémon</h2>
            <button onClick={() => setIsModalOpen(true)}>Add Pokémon</button>
            <PokemonOverviewTable 
              pokemon={selectedTrainer.pokemon} 
              selectPokemon={handleSelectPokemon} 
            />
            {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} />}
          </>
        )}

        {isModalOpen && (
          <AddPokemonModal 
            onClose={() => setIsModalOpen(false)} 
            onAddPokemon={handleAddPokemon} 
          />
        )}
      </main>
    </>
  );
};

export default Pokemons;
