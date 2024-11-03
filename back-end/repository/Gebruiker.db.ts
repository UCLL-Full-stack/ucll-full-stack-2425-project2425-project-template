import { Gebruiker } from '../model/Gebruiker';
import { users } from '../repository/User.db';
import { admins } from '../repository/Admin.db';

const gebruikers: Gebruiker[] = [...users, ...admins];

export const getUserByUsername = async (username: string): Promise<Gebruiker | null> => {
  return gebruikers.find(gebruiker => gebruiker.getUsername() === username) || null;
};