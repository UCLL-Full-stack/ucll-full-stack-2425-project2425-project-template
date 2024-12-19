import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AccountService from '../../services/AccountService';
import TransactionService from '../../services/TransactionService';
import styles from '../../styles/Home.module.css';

const CreateExpense: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('EUR');
  const [destinationAccountNumber, setDestinationAccountNumber] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);
  const router = useRouter();
  const { accountNumber } = router.query;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const expenseData = {
      amount,
      currency,
      destinationAccountNumber,
    };

    if (typeof accountNumber === 'string') {
      try {
        const sourceAccount = await AccountService.getAccountByAccountNumber(accountNumber);
        const result = await TransactionService.createExpense(accountNumber as string, expenseData);
        console.log(`Expense created successfully with body: ${JSON.stringify(expenseData)}`);
        alert('Expense created successfully!');
        setRedirect(true);
        router.push(`/transactions/overview/account/${sourceAccount.id}`);
      } catch (error) {
        console.error('An error occurred while creating the expense:', error);
      }
    } else {
      console.error('Invalid account number');
      return;
    }
  };

  if (redirect) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        Amount:
        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      </label>
      <label>
        Currency:
        <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} />
      </label>
      <label>
        Destination Account Number:
        <input type="text" value={destinationAccountNumber} onChange={(e) => setDestinationAccountNumber(e.target.value)} />
      </label>
      <button type="submit">Create Expense</button>
    </form>
  );
};

export default CreateExpense;