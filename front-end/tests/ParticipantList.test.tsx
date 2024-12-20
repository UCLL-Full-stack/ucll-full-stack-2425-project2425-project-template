// to test: in /front-end: npx jest tests/ParticipantList.test.tsx -c jest.config.js


import React from 'react';
import { render, screen } from '@testing-library/react';
import ParticipantList from '../components/crashes/ParticipantList';
import '@testing-library/jest-dom';
import { Participant } from '@types';

const mockParticipants: Participant[] = [
  {
    id: 1,
    driver: {
      id: 1,
      name: 'Lewis',
      surname: 'Hamilton',
      birthdate: new Date('1985-01-07'),
      team: 'Mercedes',
      country: 'United Kingdom',
      description: 'A skilled driver',
    },
    racecar: {
      id: 1,
      name: 'Mercedes W12',
      type: 'Formula 1',
      brand: 'Mercedes',
      hp: 1000,
    },
  },
  {
    id: 2,
    driver: {
      id: 2,
      name: 'Max',
      surname: 'Verstappen',
      birthdate: new Date('1997-09-30'),
      team: 'Red Bull',
      country: 'Netherlands',
      description: 'A competitive driver',
    },
    racecar: {
      id: 2,
      name: 'Red Bull RB16B',
      type: 'Formula 1',
      brand: 'Red Bull',
      hp: 950,
    },
  },
];

describe('ParticipantList', () => {
  it('renders participants correctly', () => {
    render(<ParticipantList participants={mockParticipants} />);

    // Check if participants are rendered
    expect(screen.getByText('Lewis Hamilton')).toBeInTheDocument();
    expect(screen.getByText('Mercedes W12 (Formula 1)')).toBeInTheDocument();
    expect(screen.getByText('Max Verstappen')).toBeInTheDocument();
    expect(screen.getByText('Red Bull RB16B (Formula 1)')).toBeInTheDocument();
  });

  it('renders no participants message when list is empty', () => {
    render(<ParticipantList participants={[]} />);

    // Check if no participants message is rendered
    expect(screen.getByText('No participants available.')).toBeInTheDocument();
  });
});