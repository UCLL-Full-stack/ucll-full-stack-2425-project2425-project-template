import React from 'react';
import { User } from '@/types';

type AccountOverviewTableProps = {
  user: User;
};

const AccountOverviewTable: React.FC<AccountOverviewTableProps> = ({ user }) => {
  return (
    <table className="table table-hover">
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
      <td colSpan={6}>No accounts available.</td>
    </tr>
  )}
</tbody>
    </table>
  );
};

export default AccountOverviewTable;