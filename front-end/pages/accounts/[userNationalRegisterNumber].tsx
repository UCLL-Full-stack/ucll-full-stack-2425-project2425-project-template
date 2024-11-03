import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserService from "@/services/UserService";
import Head from "next/head";
import Header from "@/components/header";
import { User } from "@/types";
import UserDetails from "@/components/users/UserDetails";
import AccountOverviewTable from "@/components/accounts/AccountDetails";

const ReadUserByNationalRegisterNumber = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { userNationalRegisterNumber } = router.query;

  useEffect(() => {
    if (userNationalRegisterNumber) {
      console.log("Query Parameter:", userNationalRegisterNumber); // Log to verify parameter
      const fetchUser = async () => {
        try {
          const userData = await UserService.getUserByNationalRegisterNumber(
            userNationalRegisterNumber as string
          );
          console.log("Fetched User Data:", userData); // Log fetched data
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
        <title>User Info</title>
      </Head>
      <Header />
      <main>
        <h1>User Details</h1>
        <UserDetails user={user} />
        <h2>Account Overview</h2>
        <AccountOverviewTable user={user} />
      </main>
    </>
  );
};

export default ReadUserByNationalRegisterNumber;
