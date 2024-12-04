import React, { useState } from "react";
import styles from "@/styles/Form.module.css";
import UserService from "@/services/UserService";
import { Role, StatusMessage } from "@/types/index";
import { useRouter } from "next/router";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("User");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const validate = (): boolean => {
    let result = true;
    if (userName?.trim() === "") {
      setUserNameError("Username is required.");
      result = false;
    }
    if (email?.trim() === "") {
      setEmailError("Email is required.");
      result = false;
    }
    if (password?.trim() === "") {
      setPasswordError("Password is required.");
      result = false;
    }
    return result;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    const user = { userName, email, role, password };
    const result = await UserService.registerUser(user);

    if (result.status === 200) {
      setStatusMessages([
        { message: "Account made, login in...", type: "success" },
      ]);
      const user = await result.json();
      sessionStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          token: user.token,
          userName: user.userName,
          role: user.role,
        })
      );
      setTimeout(() => {
        router.push("/profile");
      }, 300);
    } else if (result.status === 400) {
      const errorMessage = await result.json();

      setStatusMessages([{ message: errorMessage.message, type: "error" }]);
    } else {
      setStatusMessages([
        {
          message: "Error, please try again later",
          type: "error",
        },
      ]);
    }
  };

  return (
    <>
      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.div}>
            {statusMessages && (
              <div>
                {statusMessages.map(({ message, type }, index) => (
                  <p
                    key={index}
                    className={type === "error" ? styles.error : styles.success}
                  >
                    {message}
                  </p>
                ))}
              </div>
            )}
            <label htmlFor="username" className={styles.label}>
              Username:
            </label>
            <input
              className={styles.input}
              type="text"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            {userNameError && (
              <strong className={styles.error}>{userNameError}</strong>
            )}
          </div>
          <div className={styles.div}>
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              className={styles.input}
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <strong className={styles.error}>{emailError}</strong>
            )}
          </div>
          <div className={styles.div}>
            <label htmlFor="password" className={styles.label}>
              Password:
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <strong className={styles.error}>{passwordError}</strong>
            )}
          </div>
          <div className={styles.div}>
            <label htmlFor="role" className={styles.label}>
              Role:
            </label>
            <select
              className={styles.input}
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className={styles.button}>
            Register
          </button>
        </form>
      </main>
    </>
  );
};

export default RegisterForm;
