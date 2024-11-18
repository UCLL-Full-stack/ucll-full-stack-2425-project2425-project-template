import { Gebruiker } from '../model/gebruiker';
import { users } from './user.db';
import { admins } from './admin.db';

const gebruikers: Gebruiker[] = [...users, ...admins];

export const getUserByUsername = async (username: string): Promise<Gebruiker | null> => {
  return gebruikers.find(gebruiker => gebruiker.getUsername() === username) || null;
};