import React from 'react';
import { User } from '@/types';
import styles from '@/styles/Home.module.css';
import { useRouter } from 'next/router';

type AccountOverviewProps = {
  user: User;
};

const AccountOverview: React.FC<AccountOverviewProps> = ({ user }) => {
  const router = useRouter();

  const handleTransactionClick = (accountNumber: string) => {
    router.push(`/transactions/${accountNumber}`);
  };

  const handleRowClick = (id: number) => {
    router.push(`/transactions/overview/account/${id}`);
  };
  return (
    <div className={styles.accountOverview}>
      <table>
        <thead>
          <tr>
            <th>Account Number</th>
            <th>Balance</th>
            <th>Type</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Transaction</th>
          </tr>
        </thead>
        <tbody>
          {user.accounts && user.accounts.length > 0 ? (
            user.accounts.map((account) => (
              <tr key={account.id} onClick={() => account.accountNumber && account.id !== undefined && handleRowClick(account.id)} style={{ cursor: 'pointer' }}>
                <td>{account.accountNumber}</td>
                <td>{account.balance}</td>
                <td>{account.type}</td>
                <td>{account.status}</td>
                <td>{account.startDate ? new Date(account.startDate).toLocaleDateString() : 'N/A'}</td>
                <td>{account.endDate ? new Date(account.endDate).toLocaleDateString() : 'N/A'}</td>
                <td><button onClick={() => account.accountNumber && handleTransactionClick(account.accountNumber)}>Make transaction</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>You currently do not have any accounts.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AccountOverview;