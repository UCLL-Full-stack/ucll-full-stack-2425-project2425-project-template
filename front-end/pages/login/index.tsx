import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from '@components/header';
import styles from '../../styles/login/login.module.css';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serversideTranslations";
import TrainerService from "../../services/trainer.service"; // Import the updated service function

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("trainer");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const { t } = useTranslation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Basic validation
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
  
    try {
      const trainer = await TrainerService.getTrainerByEmail(email); // Fetch trainer data by email
  
      if (!trainer) {
        setErrorMessage("Trainer not found.");
        return;
      }
  
      // Validate role and password
      const { user } = trainer; // Ensure you access the `user` object within `trainer`
      if (user.role !== role || user.password !== password) {
        setErrorMessage("Invalid email, password, or role.");
        return;
      }
  
  
      // Save trainer info to localStorage
      localStorage.setItem('userEmail', trainer.user.email);  // Save the email as 'userEmail'
  
      console.log("Login successful, redirecting to home...");
      router.push("/"); // Redirect to home page
    } catch (error) {
      setErrorMessage("Login failed: User not found or incorrect credentials.");
      console.error("Login error:", error);
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
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"]))
    },
  };
};

export default LoginPage;
