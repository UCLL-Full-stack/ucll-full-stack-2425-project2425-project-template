import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import UserService from "@/services/UserService";
import { Authentication } from "@/types";
import styles from '@/styles/Home.module.css';
import LoginForm from "@/components/users/LoginForm";

const Login = () => {
  const [credentials, setCredentials] = useState<Authentication>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const user = await UserService.getUserByEmailAndPassword(credentials);
      
      // Check the response structure
      if (user && user.email) {
        alert("Login successful!");
        router.push(`/accounts/${user.nationalRegisterNumber}`);
      } else {
        alert("Login failed. User not found.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid email or password.");
    }
  };

  const handleInputChange = (field: keyof Authentication, value: any) => {
    setCredentials({ ...credentials, [field]: value });
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Personal Finance Tracker app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>Login</h1>
        <section>
        <LoginForm credentials={credentials} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Login;