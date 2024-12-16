import React from "react";
import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import styles from '@/styles/Home.module.css';
import LoginForm from "@/components/users/LoginForm";

const Login: React.FC = () => {
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
          <LoginForm />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Login;