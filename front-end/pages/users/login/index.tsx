import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/header";
import UserService from "@/services/UserService";
import { Authentication } from "@/types";

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
      </Head>
      <Header />
      <main>
        <h1>Login</h1>
        <section>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;