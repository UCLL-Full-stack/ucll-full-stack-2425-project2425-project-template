import React, { useState } from "react";
import { useRouter } from "next/router";
import UserService from "@services/user.service";
import styles from "../../styles/login/login.module.css";

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("trainer");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      const response = await UserService.logIn(email, password);
      if (response.status === 200) {
        const decryptedResponse = await response.json();
        const user = decryptedResponse.response;
        localStorage.setItem("loggedInUser", JSON.stringify({
          token: user.token,
          role: user.role,
          fullName: `${user.firstName} ${user.lastName}`,
          email: user.email,
        }));

        // Call the parent function to handle success
        onLoginSuccess();

        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      setErrorMessage("Login failed: User not found or incorrect credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleLogin} className={styles.form}>
      <div className={styles.radioGroup}>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>Email</label>
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
        <label htmlFor="password" className={styles.label}>Password</label>
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
  );
};

export default LoginForm;
