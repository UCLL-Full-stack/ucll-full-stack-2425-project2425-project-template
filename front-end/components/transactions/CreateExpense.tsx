import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css';
import TransactionService from '@/services/TransactionService';
import AccountService from '@/services/AccountService';

const CreateExpense: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('EUR');
  const [destinationAccountNumber, setDestinationAccountNumber] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);
  const router = useRouter();
  const { accountNumber } = router.query;

  useEffect(() => {
    setRedirect(false);
  }, []);

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
    <section>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
        <label htmlFor="currency">Currency:</label>
        <select
          name="currency"
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
        </select>
        <label htmlFor="destinationAccountNumber">Destination Account Number:</label>
        <input
          type="text"
          id="destinationAccountNumber"
          name="destinationAccountNumber"
          value={destinationAccountNumber}
          onChange={(e) => setDestinationAccountNumber(e.target.value)}
          required
        />
        <button type="submit">Create Expense</button>
      </form>
    </section>
  );
};

export default CreateExpense;
