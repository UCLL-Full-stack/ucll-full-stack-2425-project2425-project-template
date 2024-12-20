// to test: in /front-end: npx jest tests/CrashOverviewTable.test.tsx -c jest.config.js -t "CrashOverviewTable"

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CrashOverviewTable from '../components/crashes/CrashOverviewTable'; // Adjust the import path as needed
import '@testing-library/jest-dom';
import { Crash, Race, Gebruiker } from '@types';

const mockCrashes: Crash[] = [
  { id: 1, type: 'Collision', description: 'A severe crash', casualties: 5, deaths: 2, participants: [] },
  { id: 2, type: 'Spin', description: 'A minor spin', casualties: 0, deaths: 0, participants: [] },
];

const mockRace: Race = { id: 1, name: 'Grand Prix', type: 'Formula 1', description: 'A high-speed race', location: 'Monaco', date: new Date(), crashes: [] };

const mockLoggedInUser: Gebruiker = { 
  id: 1, 
  username: 'testuser', 
  password: 'password123', 
  name: 'Test', 
  surname: 'User', 
  email: 'testuser@example.com', 
  permission: 'USER', 
  createdAt: new Date() 
};

const mockOnCrashClick = jest.fn();
const mockHandleEditCrash = jest.fn();
const mockHandleDeleteCrash = jest.fn();

describe('CrashOverviewTable', () => {
  it('renders crashes and handles crash click', () => {
    render(
      <CrashOverviewTable
        crashes={mockCrashes}
        onCrashClick={mockOnCrashClick}
        selectedRace={mockRace}
        handleEditCrash={mockHandleEditCrash}
        handleDeleteCrash={mockHandleDeleteCrash}
        loggedInUser={mockLoggedInUser}
      />
    );

    // Check if crashes are rendered
    expect(screen.getByText('Collision')).toBeInTheDocument();
    expect(screen.getByText('A severe crash')).toBeInTheDocument();
    expect(screen.getByText('Spin')).toBeInTheDocument();
    expect(screen.getByText('A minor spin')).toBeInTheDocument();

    // Simulate crash click
    fireEvent.click(screen.getByText('Collision'));
    expect(mockOnCrashClick).toHaveBeenCalledWith(mockCrashes[0]);
  });
});