import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from '@components/header';
import styles from '../../styles/login/login.module.css';  // Import the styles

// Simulate a simple login service
const loginService = async (email: string, password: string, role: string) => {
  // In a real scenario, you would use a backend service for authentication.
  // Here, we're assuming a simple check based on hardcoded values for demonstration.

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation (can be enhanced)
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    const response = await loginService(email, password, role);

    if (response.success) {
      // Redirect based on role
      if (response.role === "trainer") {
        router.push("/pokemons"); // Redirect to the trainer's Pokémon page
      } else if (response.role === "nurse") {
        router.push("/nurseDashboard"); // Redirect to the nurse's dashboard (implement this page)
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>PokéPal</h1>
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
            Trainer
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
            Nurse
          </label>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email:</label>
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
          <label htmlFor="password" className={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.button}>Login</button>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
