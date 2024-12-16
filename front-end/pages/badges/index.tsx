import React, { useEffect, useState } from 'react';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { serverSideTranslations } from 'next-i18next/serversideTranslations';
import { useTranslation } from 'next-i18next';
import { Badge, Trainer } from '@types';
import TrainerService from '@services/trainer.service';
import BadgeDetails from '@components/badges/badgeDetails';


const badges: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState<string>('');

  const { t } = useTranslation();

  // Check if the code is running in the browser and then access localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('userEmail') || '';  // Get the email from localStorage
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

  useEffect(() => {
    // Only run the getTrainers function when loggedInEmail is available
    if (loggedInEmail) {
      getTrainers();
    }
  }, [loggedInEmail]);

  return (
    <>
      <Header />
      <main>
      <h1>Badge</h1>
        {trainers.length === 0 ? (
          <p>No trainers found for the logged-in email.</p>
        ) : (
          <>
            {selectedTrainer && (
              <>
                <h2>{selectedTrainer.user.firstName}'s badges:</h2>
                <BadgeDetails badges={selectedTrainer.badges} />
              </>
            )}
          </>
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

export default badges;