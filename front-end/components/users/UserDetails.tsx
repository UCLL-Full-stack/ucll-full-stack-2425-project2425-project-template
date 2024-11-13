import React from 'react';
import { User } from '@/types';
import styles from '@/styles/Home.module.css';

type Props = { user: User };

const UserDetails: React.FC<Props> = ({ user }: Props) => {
  return (
    <>
      {user && (
        <div>
          <h1>Welcome {user.name}!</h1>
          <section className={styles.userDetails}>
            <table>
              <tbody>
                <tr>
                  <td>ID:</td>
                  <td>{user.id}</td>
                </tr>
                <tr>
                  <td>Name:</td>
                  <td>{user.name}</td>
                </tr>
                <tr>
                  <td>Phone Number:</td>
                  <td>{user.phoneNumber}</td>
                </tr>
                <tr>
                  <td>E-mail:</td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td>National Register Number:</td>
                  <td>{user.nationalRegisterNumber}</td>
                </tr>
                <tr>
                  <td>Birth date:</td>
                  <td>{user.birthDate ? new Date(user.birthDate).toDateString() : 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      )}
    </>
  );
};

export default UserDetails;
