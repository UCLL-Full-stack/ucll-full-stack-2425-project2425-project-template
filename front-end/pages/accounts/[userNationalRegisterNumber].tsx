import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserService from "@/services/UserService";
import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { User } from "@/types";
import UserDetails from "@/components/users/UserDetails";
import AccountOverview from "@/components/accounts/AccountOverview";
import styles from '@/styles/Home.module.css';
import AccountService from "@/services/AccountService";
import useSWR, { mutate } from "swr";

const ReadUserByNationalRegisterNumber = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { userNationalRegisterNumber } = router.query;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
        console.log("Logged In User:", loggedInUser);

        if (!loggedInUser.nationalRegisterNumber) {
          throw new Error("No national register number found in loggedInUser");
        }

        const userData = await UserService.getUserByNationalRegisterNumber(
          loggedInUser.nationalRegisterNumber
        );
        console.log("Fetched User Data:", userData);
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userNationalRegisterNumber) {
      console.log("Query Parameter:", userNationalRegisterNumber);
      fetchUser();
    } else {
      console.log("No userNationalRegisterNumber provided");
      setLoading(false);
    }
  }, [userNationalRegisterNumber]);

  const getAccountsForUser = async () => {
    const accounts = await AccountService.getAccountsForUser();
    // console.log(accounts)
    return accounts;
  }
  
  const { data: accounts, error, isLoading } = useSWR('getAccounts', getAccountsForUser);
  
  setInterval(() => {
      mutate("getAccounts", getAccountsForUser());
  }, 480000);


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
        <AccountOverview accounts={accounts!} />
      </main>
      <Footer />
    </>
  );
};

export default ReadUserByNationalRegisterNumber;
