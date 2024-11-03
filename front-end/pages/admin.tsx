import Header from '@components/header';
import React, { useEffect, useState } from 'react';
import styles from "../styles/Home.module.css";
import AnimalOverviewTable from '@components/admin/AnimalOverviewTable';
import ExpenseOverviewTable from '@components/admin/ExpenseOverviewTable';
import AnimalService from '@services/AnimalService';
import ExpenseService from '@services/ExpenseService';

type Animal = {
  id: number;
  name: string;
  species: string;
};

type Expense = {
  totalCost: number;
  month: string;
};

const Admin: React.FC = () => {
  const [animals, setAnimals] = useState<Array<Animal>>([]);
  const [expenses, setExpenses] = useState<Array<Expense>>([]); // Define the expenses state
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  const getAnimals = async () => {
    try {
      const response = await AnimalService.getAnimals();
      const animals = await response.json();
      setAnimals(animals);
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  };

  const getExpenses = async () => {
    try {
      const response = await ExpenseService.getExpenses();
      const expenses = await response.json();
      setExpenses(expenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    getAnimals();
    getExpenses();
  }, []);

  const selectAnimal = (animal: Animal) => {
    setSelectedAnimal(animal);
  };

  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.description}>
            <h1>Admin Dashboard</h1>
          </div>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h2>Animals</h2>
              <AnimalOverviewTable animals={animals} selectAnimal={selectAnimal} />
            </div>
            <div className={styles.card}>
              <h2>Expenses</h2>
              <ExpenseOverviewTable expenses={expenses} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
