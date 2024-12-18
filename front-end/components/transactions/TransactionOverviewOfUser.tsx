import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TransactionService from '@/services/TransactionService';
import { Transaction } from '@/types';
import styles from '@/styles/Home.module.css';

const TransactionOverviewOfUser: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    console.log(`Router query:`, router.query);
    const fetchTransactions = async () => {
      if (userId) {
        console.log(`Fetching transactions for id: ${userId}`);
        try {
          const fetchedTransactions = await TransactionService.getTransactionsByUserId(Number(userId));
          console.log('Fetched transactions:', fetchedTransactions);
          setTransactions(fetchedTransactions);
        } catch (error) {
          console.error('Error fetching transactions:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log('No id provided in the query');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId, router.query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.accountOverview}>
      <table>
        <thead>
          <tr>
            <th>Reference number</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Date</th>
            <th>Source Account</th>
            <th>Destination Account</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.referenceNumber}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.currency}</td>
                <td>{transaction.date ? new Date(transaction.date).toLocaleDateString() : 'N/A'}</td>
                <td>{transaction.sourceAccount.accountNumber}</td>
                <td>{transaction.destinationAccount.accountNumber}</td>
                <td>{transaction.type}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No transactions yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionOverviewOfUser;