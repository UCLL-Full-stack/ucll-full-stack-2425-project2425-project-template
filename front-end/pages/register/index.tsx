import React from 'react';
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@components/header';
import userService from '@services/UserService';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const validateInput = () => {
    if (!username || !password || !name || !surname || !email) {
      setError('All fields are required.');
      return false;
    }
    return true;
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateInput()) return;

    try {
      const userInput = {
        username,
        password,
        name,
        surname,
        email,
        permission: 'USER',
      };
      const response = await userService.createUser(userInput);
      if (response.ok) {
        setSuccessMessage('Registration successful! You can now log in.');
        setError('');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        setSuccessMessage('');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Header />
      <main className="container">
        <h1 className="text-center my-4">Register</h1>
        <form onSubmit={handleRegister} className="mx-auto" style={{ maxWidth: '400px' }}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="surname" className="form-label">Surname</label>
            <input
              type="text"
              id="surname"
              className="form-control"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <br/><br/>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default Register;