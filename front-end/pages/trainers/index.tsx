// pages/trainers.tsx
import React, { useEffect, useState } from 'react';
import Header from '@components/header';
import TrainerOverviewTable from '@components/trainers/trainersOverviewTable';
import TrainerService from '@services/trainer.service';
import { Trainer } from '@types';
import TrainerDetails from '@components/trainers/trainersDetail';

const Trainers: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

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

  return (
    <>
      <Header />
      <main>
        <h1>Trainers</h1>
        <TrainerOverviewTable trainers={trainers} selectTrainer={handleSelectTrainer} />
        {selectedTrainer && <TrainerDetails trainer={selectedTrainer} />} {/* Use the new component */}
      </main>
    </>
  );
};

export default Trainers;
