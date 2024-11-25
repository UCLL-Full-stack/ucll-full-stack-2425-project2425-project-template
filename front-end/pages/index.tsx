import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Header from '@/components/header';
import Footer from '@/components/footer';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Personal Finance Tracker app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>Welcome to Personal Finance Tracker!</h1>
        <div>
          <p>
            Easily manage your finances and reach your financial goals with the Personal Finance Tracker. Here’s what you can do: </p>
            <ul>
            <li><h2>Multiple Accounts</h2>
            <p>Log in to create and manage multiple bank accounts. You can even share access with others, while retaining full control over your accounts.</p></li>

            <li><h2>Seamless Transactions</h2>
            <p>Send and receive money effortlessly between accounts.</p></li>

            {/* <li><p>Set Budget Goals</p>
            <p>Set up your budget goals, and the app will guide you on what’s left to save or what you can safely spend.</p></li> */}

            <li><h2>Expense & Income Tracking</h2>
            <p>Review all your expenses and income with detailed sorting options by date, amount, or category.</p></li>

            <li><h2>Secure & Managed Environment</h2>
            <p>With bank administrators on hand to monitor accounts and ensure security, your data is always safe.</p></li>
            </ul>
          <p>Get started today to take control of your finances!</p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
