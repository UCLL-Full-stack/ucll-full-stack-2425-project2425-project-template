import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@components/header';
import { useRouter } from 'next/router';
import '@testing-library/jest-dom'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@services/InviteService', () => ({
  getInvitesByUserEmail: jest.fn(),
}));

jest.mock('@services/TicketService', () => ({
  getTicketsByUserEmail: jest.fn(),
}));

test('Test Header component', async () => {
    render(<Header />);

    expect(screen.getByText('Eventora'));
});

// Tests are not working