import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from '@components/header';
import styles from '../../styles/login/login.module.css';  // Import the styles
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serversideTranslations";

// Simulate a simple login service
const loginService = async (email: string, password: string, role: string) => {
  if (role === "trainer") {
    if (email === "trainer@example.com" && password === "trainer123") {
      // Save trainer info to localStorage (can replace with your auth logic)
      localStorage.setItem("trainerId", "trainer12345");
      return { success: true, role: "trainer" };
    }
  } else if (role === "nurse") {
    if (email === "nurse@example.com" && password === "nurse123") {
      // Save nurse info to localStorage (can replace with your auth logic)
      localStorage.setItem("nurseId", "nurse12345");
      return { success: true, role: "nurse" };
    }
  }

  return { success: false, message: "Wrong email or password." };
};

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("trainer");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const {t} = useTranslation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation (can be enhanced)
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    const response = await loginService(email, password, role);

    if (response.success) {
      console.log("Login successful, redirecting to home...");
      router.push("/"); // Redirect to home page
    } else {
      console.log("Login failed: ", response.message);
      setErrorMessage(response.message || "Login failed.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{t("app.title")}</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="role"
              value="trainer"
              checked={role === "trainer"}
              onChange={() => setRole("trainer")}
              className={styles.radio}
            />
            {t("login.Trainer")}
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="role"
              value="nurse"
              checked={role === "nurse"}
              onChange={() => setRole("nurse")}
              className={styles.radio}
            />
            {t("login.Nurse")}
          </label>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>{t("login.email")}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>{t("login.password")}</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.button}>{t("login.login")}</button>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export const getServerSideProps = async (context: { locale: any; }) => {
  const {locale} = context;

  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"]))
      },
  };
};

export default LoginPage;
