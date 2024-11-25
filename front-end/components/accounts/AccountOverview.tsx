import React from 'react';
import { User } from '@/types';
import styles from '@/styles/Home.module.css';

type AccountOverviewProps = {
  user: User;
};

const AccountOverview: React.FC<AccountOverviewProps> = ({ user }) => {
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
          </tr>
        </thead>
        <tbody>
          {user.accounts && user.accounts.length > 0 ? (
            user.accounts.map((account) => (
              <tr key={account.id}>
                <td>{account.accountNumber}</td>
                <td>{account.balance}</td>
                <td>{account.type}</td>
                <td>{account.status}</td>
                <td>{account.startDate ? new Date(account.startDate).toLocaleDateString() : 'N/A'}</td>
                <td>{account.endDate ? new Date(account.endDate).toLocaleDateString() : 'N/A'}</td>
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