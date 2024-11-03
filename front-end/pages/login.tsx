import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import logo from "../components/logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      router.push("/admin");
    } else if (username === "caretaker" && password === "caretaker") {
      router.push("/caretaker");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className={styles.container}>
      <Image src={logo} alt="Logo" className={styles.logo} width={150} height={150} /> {/* Use the Image component */}
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <label className={styles.label}>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <label className={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Login;