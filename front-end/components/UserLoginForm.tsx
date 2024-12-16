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
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearErrors();

    if (!validate()) {
        setStatusMessages([{ message: t("validation.error"), type: "error" }]);
        return;
    }

    try {
        const response = await StudentService.login(name, password);

        if (response.status === 200) {
            const user = await response.json(); // Ensure user is returned as a JSON object
            
            // Handle user role and redirect
            if (user.role === "Admin" && localStorage.getItem("adminLoggedIn")) {
                setStatusMessages([{ message: t("login.adminExists"), type: "error" }]);
                return;
            }

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify({
                    token: user.token,
                    role: user.role,
                })
            );

            if (user.role === "Admin") {
                localStorage.setItem("adminLoggedIn", "true");
                router.push("/admin-dashboard");
            } else {
                router.push("/student-dashboard");
            }

            setStatusMessages([{ message: t("login.success"), type: "success" }]);
        } else {
            setStatusMessages([{ message: t("login.error.invalidCredentials"), type: "error" }]);
        }
    } catch (error) {
        setStatusMessages([{ message: t("login.error.server"), type: "error" }]);
    }
};


  return (
    <div className={styles.userLoginPage}>
      <form onSubmit={handleSubmit} className={styles.userLoginForm}>
        <h3 className={styles.titleForm}>{t("login.login")}</h3>
        
        {/* Username Field */}
        <label className={styles.formLabels} htmlFor="nameInput">{t("login.gebruikersnaam")}</label>
        <input
          className={styles.inputField}
          id="nameInput"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        {nameError && <p className={errorStyles.errorMessage}>{nameError}</p>}

        {/* Password Field */}
        <label className={styles.formLabels} htmlFor="passwordInput">{t("login.wachtwoord")}</label>
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
