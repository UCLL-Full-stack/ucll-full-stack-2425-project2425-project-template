import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { UserTable } from "../../types/auth";
import UserService from "../../services/authService";
import UserOverviewTable from "../../components/users/admin_Useroverview";

const Users: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<Array<UserTable>>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // useEffect(() => {
  //   const role = localStorage.getItem("role");
  //   if (role !== "admin") {
  //     router.push("/planner"); 
  //   } else {
  //     setIsAdmin(true);
  //     getAllUsers();
  //   }
  // }, [router]);

  // const getAllUsers = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       const data = await UserService.getAllUsers(token);
  //       setUsers(data);
  //     } else {
  //       console.error("No token found");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  // if (!isAdmin) {
  //   return null; 
  // }

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <main className="flex flex-col items-center justify-start min-h-screen py-8 bg-gray-100">
        <section className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Users Overview</h2>
          {users && <UserOverviewTable users={users} />}
        </section>
      </main>
    </>
  );
};

export default Users;
