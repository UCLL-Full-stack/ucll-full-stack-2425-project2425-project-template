import React from 'react';
import { User, Account } from '../../types';

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
      {user.accounts && user.accounts.map((account, index) => (
          <tr key={index}>
            <td>{account.accountNumber}</td>
            <td>{account.balance}</td>
            <td>{account.type}</td>
            <td>{account.status}</td>
            <td>{account.startDate?.toLocaleDateString()}</td>
            <td>{account.endDate ? account.endDate.toLocaleDateString() : 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AccountOverviewTable;