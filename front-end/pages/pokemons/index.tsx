import React, { useEffect, useState } from 'react';
import Header from '@components/header';
import PokemonOverviewTable from '@components/pokemon/pokemonOverviewTable';
import TrainerService from '@services/trainer.service';
import nurseService from '@services/nurse.service';
import { Nurse, Pokemon, Trainer } from '@types';
import PokemonDetails from '@components/pokemon/pokemonDetails';
import AddPokemonModal from '@components/pokemon/addPokemonModal';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serversideTranslations';
import PokemonDetailsNurse from '@components/pokemon/pokemonDetailsNurse';

const Pokemons: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [nurses, setNurses] = useState<Nurse[]>([]);  // Store the list of nurses
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [selectedNurse, setSelectedNurse] = useState<Nurse | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState<string>('');
  const [role, setRole] = useState<string>('guest');
  const [update, setUpdate] = useState<boolean>(true);

  const { t } = useTranslation();

  const clearSelected = (pokemon: Pokemon | null) => {
    setSelectedPokemon(pokemon)
  }

  // Check if the code is running in the browser and then access localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedInUser = localStorage.getItem('loggedInUser');
      let email = '';
      if (loggedInUser) {
        const parsedUser = JSON.parse(loggedInUser);
        email = parsedUser.email;
        setRole(parsedUser.role);
      }
      setLoggedInEmail(email);
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const getTrainerByEmail = async (email: string) => {
    try {
      const trainer = await TrainerService.getTrainerByEmail(email);
      setTrainers([trainer]);
      setSelectedTrainer(trainer);
    } catch (error) {
      console.error(error);
    }
  };

  const getNurseByEmail = async (email: string) => {
    try {
      const nurse = await nurseService.getNurseByEmail(email);
      setNurses([nurse]); // Store the nurse's data
      setSelectedNurse(nurse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (loggedInEmail && role) {
      if (role === 'trainer') {
        getTrainerByEmail(loggedInEmail);
      } else if (role === 'nurse') {
        getNurseByEmail(loggedInEmail);
      }
    }
  }, [loggedInEmail, role, update]); // Make sure to re-run the effect when these values change

  const handleSelectPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleAddPokemon = async (newPokemon: Pokemon) => {
    try {
      if (selectedTrainer && selectedTrainer.id) {
        const updatedTrainer = await TrainerService.addPokemonToTrainerById(
          selectedTrainer.id,
          newPokemon
        );
        setSelectedTrainer(updatedTrainer);
        setTrainers((prevTrainers) =>
          prevTrainers.map((trainer) =>
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
        <h1>{t('pokemon.pokemon')}</h1>
        {/* If logged in as a trainer, display their Pokémon */}
        {role === 'trainer' && trainers.length === 0 ? (
          <p>No trainers found for the logged-in email.</p>
        ) : (
          <>
            {role === 'trainer' && selectedTrainer && (
              <>
                <h2>
                  {selectedTrainer.user.firstName}
                  {t('pokemon.users-pokemon')}
                </h2>
                <button onClick={() => setIsModalOpen(true)}>{t('pokemon.add')}</button>
                <PokemonOverviewTable
                  pokemon={selectedTrainer.pokemon}
                  selectPokemon={handleSelectPokemon}
                />
                {selectedPokemon && (
                  <PokemonDetails
                    pokemon={selectedPokemon}
                    nurseId={1}  // Pass the nurseId if necessary
                    reload={setUpdate}
                    update={update}
                    clearSelected={clearSelected}
                  />
                )}
              </>
            )}
          </>
        )}

        {/* If logged in as a nurse, show their Pokémon */}
        {role === 'nurse' && nurses.length === 0 ? (
          <p>No nurse found for the logged-in email.</p>
        ) : (
          <>
            {role === 'nurse' && selectedNurse && (
              <>
                <h2>
                  {selectedNurse.user.firstName}
                  {t('pokemon.nurse-pokemon')}
                </h2>
                <PokemonOverviewTable
                  pokemon={selectedNurse.pokemon}  // Display the Pokémon of the nurse
                  selectPokemon={handleSelectPokemon}
                />
                {selectedPokemon && (
                  <PokemonDetailsNurse
                    pokemon={selectedPokemon}
                    nurseId={1}  // Pass the nurseId if necessary
                    reload={setUpdate}
                    update={update}
                    clearSelected={clearSelected}
                  />
                )}
              </>
            )}
          </>
        )}

        {isModalOpen && (
          <AddPokemonModal onClose={() => setIsModalOpen(false)} onAddPokemon={handleAddPokemon} />
        )}
      </main>
    </>
  );
};

export const getServerSideProps = async (context: { locale: any }) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default Pokemons;
