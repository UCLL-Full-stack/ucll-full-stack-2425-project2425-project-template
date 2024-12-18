import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CreateExpense from "@/components/transactions/CreateExpense";
import styles from '@/styles/Home.module.css';

const CreateExpensePage = () => {
  return (
    <>
      <Head>
        <title>Create a new Expense</title>
        <meta name="description" content="Personal Finance Tracker app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>Create a new Expense</h1>
        <CreateExpense />
      </main>
      <Footer />
    </>
  );
};

export default CreateExpensePage;