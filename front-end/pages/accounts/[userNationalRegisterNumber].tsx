import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserService from "@/services/UserService";
import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { User } from "@/types";
import UserDetails from "@/components/users/UserDetails";
import AccountDetails from "@/components/accounts/AccountDetails";
import styles from '@/styles/Home.module.css';

const ReadUserByNationalRegisterNumber = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { userNationalRegisterNumber } = router.query;

  useEffect(() => {
    if (userNationalRegisterNumber) {
      console.log("Query Parameter:", userNationalRegisterNumber);
      const fetchUser = async () => {
        try {
          const userData = await UserService.getUserByNationalRegisterNumber(
            userNationalRegisterNumber as string
          );
          console.log("Fetched User Data:", userData);
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch user:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      console.log("No userNationalRegisterNumber provided");
      setLoading(false);
    }
  }, [userNationalRegisterNumber]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <>
      <Head>
        <title>Account Overview</title>
        <meta name="description" content="Personal Finance Tracker app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <UserDetails user={user} />
        <h2>Account Overview</h2>
        <AccountDetails user={user} />
      </main>
      <Footer />
    </>
  );
};

export default ReadUserByNationalRegisterNumber;
