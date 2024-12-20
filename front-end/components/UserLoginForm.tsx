import { StatusMessage } from "../types";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/UserLoginForm.module.css";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import errorStyles from "../styles/errorMessage.module.css";
import UserService from "@/services/UserService";

const UserLoginForm: React.FC = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const clearErrors = () => {
    setNameError(null);
    setPasswordError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let isValid = true;

    if (!name.trim()) {
      setNameError(t("validation.username.required"));
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError(t("validation.password.required"));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();
  
    if (!validate()) {
      setStatusMessages([{ message: t("validation.error"), type: "error" }]);
      return;
    }
  
    try {
      const response = await UserService.loginUser(name, password);
  
      if (response.success && response.user) {
        const { token, fullname, username, role } = response.user;
  
        // Store user data in localStorage
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ token, fullname, username, role })
        );
  
        setStatusMessages([{ message: t("login.success"), type: "success" }]);
        router.push("/");
      } else if (response.success && !response.user) {
        // Handle cases where success is true but no user data is returned
        setStatusMessages([{ message: t("login.error.noUserData"), type: "error" }]);
      } else {
        setStatusMessages([{ message: t("login.error.invalidCredentials"), type: "error" }]);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || t("login.error.server");
      setStatusMessages([{ message: errorMessage, type: "error" }]);
    }
  };
  

  return (
    <div className={styles.userLoginPage}>
      <form onSubmit={handleSubmit} className={styles.userLoginForm}>
        <h3 className={styles.titleForm}>{t("login.login")}</h3>

        {/* Username Field */}
        <label className={styles.formLabels} htmlFor="nameInput">
          {t("login.gebruikersnaam")}
        </label>
        <input
          className={styles.inputField}
          id="nameInput"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        {nameError && <p className={errorStyles.errorMessage}>{nameError}</p>}

        {/* Password Field */}
        <label className={styles.formLabels} htmlFor="passwordInput">
          {t("login.wachtwoord")}
        </label>
        <input
          className={styles.inputField}
          id="passwordInput"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {passwordError && <p className={errorStyles.errorMessage}>{passwordError}</p>}

        {/* Status Messages */}
        {statusMessages.length > 0 && (
          <ul className={errorStyles.userLoginStatusMessages}>
            {statusMessages.map(({ message, type }, index) => (
              <li key={index} className={type === "error" ? errorStyles.error : errorStyles.success}>
                {message}
              </li>
            ))}
          </ul>
        )}

        <button className={styles.loginButton} type="submit">
          {t("login.login")}
        </button>

        <Link href="/register">
          <button type="button" className={styles.registerButton}>
            {t("login.registreer")}
          </button>
        </Link>
      </form>
    </div>
  );
};

export default UserLoginForm;
