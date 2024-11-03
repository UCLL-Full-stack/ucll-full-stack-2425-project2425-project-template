import Header from '@components/header';
import React, { useEffect, useState } from 'react';
import styles from "../styles/Home.module.css";
import AnimalService from '@services/AnimalService';

type User = {
  id: number;
  username: string;
  password: string;
  role: string;
};

type Caretaker = {
  id: number;
  name: string;
  user: User;
};

type Animal = {
  id: number;
  name: string;
  species: string;
  age: number;
  favouriteFood: string;
  favouritetoy: string;
  costPerMonth: number;
  caretakers: Caretaker[];
};

const Caretaker: React.FC = () => {
  const [animals, setAnimals] = useState<Array<Animal>>([]);
  const [caretakers, setCaretakers] = useState<Record<string, Caretaker & { animals: Animal[] }>>({});

  const getAnimals = async () => {
    try {
      const response = await AnimalService.getAnimals();
      const animals = await response.json();
      setAnimals(animals);

      const caretakersMap: Record<string, Caretaker & { animals: Animal[] }> = {};

      animals.forEach(animal => {
        animal.caretakers.forEach(caretaker => {
          if (!caretakersMap[caretaker.id]) {
            caretakersMap[caretaker.id] = { ...caretaker, animals: [] };
          }
          caretakersMap[caretaker.id].animals.push(animal);
        });
      });

      setCaretakers(caretakersMap);
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  };

  useEffect(() => {
    getAnimals();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.description}>
            <h1>Caretaker Dashboard</h1>
          </div>
          <div className={styles.grid}>
            {Object.values(caretakers).map((caretaker) => (
              <div key={caretaker.id} className={styles.card}>
                <h2>{caretaker.name}</h2>
                {caretaker.animals.map((animal) => (
                  <div key={animal.id} className={styles.card}>
                    <h3>{animal.name}</h3>
                    <p>Species: {animal.species}</p>
                    <p>Age: {animal.age}</p>
                    <p>Favourite Food: {animal.favouriteFood}</p>
                    <p>Favourite Toy: {animal.favouritetoy}</p>
                    <p>Cost Per Month: {animal.costPerMonth}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Caretaker;