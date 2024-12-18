import React, { useEffect, useState } from 'react';
import Header from '@components/header';
import PokemonOverviewTable from '@components/pokemon/pokemonOverviewTable';
import TrainerService from '@services/trainer.service';
import { Pokemon, Trainer } from '@types';
import PokemonDetails from '@components/pokemon/pokemonDetails';
import TrainerOverviewTable from '@components/trainer/trainerOverviewTable';
import AddPokemonModal from '@components/pokemon/addPokemonModal';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serversideTranslations';

const Pokemons: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState<string>('');
  const [role, setRole] = useState<String>("guest")

  const { t } = useTranslation();

  // Check if the code is running in the browser and then access localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedInUser = localStorage.getItem('loggedInUser');
      let email = ''
      if (loggedInUser) {
        const parsedUser = JSON.parse(loggedInUser)
        email = parsedUser.email
        setRole(parsedUser.role)
      } 
      setLoggedInEmail(email);
    }
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  const getTrainers = async () => {
    try {
      const allTrainers = await TrainerService.getAllTrainers();

      // Filter trainers by the logged-in user's email
      const filteredTrainers = allTrainers.filter((trainer) => trainer.user.email === loggedInEmail);

      setTrainers(filteredTrainers);

      // If we found a matching trainer, set them as the selected trainer
      if (filteredTrainers.length > 0) {
        setSelectedTrainer(filteredTrainers[0]); // Only set the first matching trainer
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTrainerByEmail = async(email:string) =>{
    try {
      const trainer = await TrainerService.getTrainerByEmail(email);
      console.log(trainer)

      setTrainers([trainer]);
      setSelectedTrainer(trainer)
      }
     catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Only run the getTrainers function when loggedInEmail is available
    if (loggedInEmail) {
      if (role== "trainer") {
        getTrainerByEmail(loggedInEmail)
      }
    }
  }, [loggedInEmail]);

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
        <h1>{t("pokemon.pokemon")}</h1>
        {trainers.length === 0 ? (
          <p>No trainers found for the logged-in email.</p>
        ) : (
          <>
            {/* Ensure selectedTrainer is not null before accessing its properties */}
            {selectedTrainer && (
              <>
                <h2>{selectedTrainer.user.firstName}{t("pokemon.users-pokemon")}</h2>
                <button onClick={() => setIsModalOpen(true)}>{t("pokemon.add")}</button>
                <PokemonOverviewTable 
                  pokemon={selectedTrainer.pokemon} 
                  selectPokemon={handleSelectPokemon} 
                />
                {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} />}
              </>
            )}
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

export const getServerSideProps = async (context: { locale: any; }) => {
  const {locale} = context;

  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"]))
      },
  };
};

export default Pokemons;
