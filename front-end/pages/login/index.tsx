import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@components/header';
import authService from '@services/authService';
import UserLoginForm from '@components/users/UserLoginForm';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await authService.login({ username, password, role });
      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('loggedInUser', JSON.stringify({ username: userData.username, role: userData.role }));
        router.push('/');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Header />
      <main className="container">
        <h1 className="text-center my-4">Login</h1>
        <UserLoginForm/>
      </main>
    </>
  );
};

export default Login;