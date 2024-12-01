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

  const validateInput = () => {
    if (!username || !password || !role) {
      setError('All fields are required.');
      return false;
    }
    return true;
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateInput()) return;

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
        <UserLoginForm
          username={username}
          password={password}
          role={role}
          error={error}
          setUsername={setUsername}
          setPassword={setPassword}
          setRole={setRole}
          handleLogin={handleLogin}
        />
        <div className="text-center mt-3">
          <button className="btn btn-secondary" onClick={() => router.push('/register')}>
            Register
          </button>
        </div>
      </main>
    </>
  );
};

export default Login;