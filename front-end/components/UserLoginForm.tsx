import { StatusMessage } from "../types";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from '../styles/UserLoginForm.module.css';
import { useTranslation } from "next-i18next";
import Link from "next/link";
import StudentService from "../services/StudentServices";
import errorStyles from '../styles/errorMessage.module.css';

const UserLoginForm: React.FC = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
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

    // Username validation
    if (!name.trim()) {
      setNameError(t("validation.username.required"));
      isValid = false;
    } else if (name.length < 3) {
      setNameError(t("validation.username.min"));
      isValid = false;
    } else if (name.length > 20) {
      setNameError(t("validation.username.max"));
      isValid = false;
    } 
    else {
      setNameError(null);
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError(t("validation.password.required"));
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError(t("validation.password.min"));
      isValid = false;
    } else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      setPasswordError(t("validation.password.format"));
      isValid = false;
    } else {
      setPasswordError(null);
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearErrors();

    if (!validate()) {
      setStatusMessages([
        { message: "Validation failed", type: "error" },
      ]);
      return;
    }

    const credentials = { username: name, password };
    const response = await StudentService.loginStudent(credentials);

    if (response.status === 200) {
      setStatusMessages([{ message: t("login.success"), type: "success" }]);
      
      const student = await response.json();
      localStorage.setItem(
        "loggedInUser", 
        JSON.stringify({
          token: student.token,
          username: student.username,
          email: student.email,
          studentNumber: student.studentNumber,
          role: student.role
        })
      );
      
      setTimeout(() => {
        router.push("/");
      }, 2000);

    } else {
      setStatusMessages([{ message: t("login.error"), type: "error" }]);
    }
  };

  return (
    <div className={styles.userLoginPage}>
      <form onSubmit={handleSubmit} className={styles.userLoginForm}>
        <h3 className={styles.titleForm}>{t("login.login")}</h3>
        
        <label className={styles.formLabels} htmlFor="nameInput">{t("login.gebruikersnaam")}</label>
        <input className={styles.inputField}
          id="nameInput"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        {nameError && <p className={errorStyles.errorMessage}>{nameError}</p>}

        <label className={styles.formLabels} htmlFor="passwordInput">{t("login.wachtwoord")}</label>
        <input className={styles.inputField}
          id="passwordInput"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {passwordError && <p className={errorStyles.errorMessage}>{passwordError}</p>}

        {statusMessages.length > 0 && (
          <ul className={errorStyles.userLoginStatusMessages}>
            {statusMessages.map(({ message, type }, index) => (
              <li key={index} className={type === "error" ? errorStyles.error : errorStyles.success}>
                {message}
              </li>
            ))}
          </ul>
        )}

        <button className={styles.loginButton} type="submit">{t("login.login")}</button>

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