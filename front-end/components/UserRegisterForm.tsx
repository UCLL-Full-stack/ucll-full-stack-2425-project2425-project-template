import { StatusMessage } from "../types";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from '../styles/UserLoginForm.module.css';
import { useTranslation } from "next-i18next";
import Link from "next/link";
import errorStyles from '../styles/errorMessage.module.css';

const UserRegisterForm: React.FC = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [studentNumberError, setStudentNumberError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const clearErrors = () => {
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
    setStudentNumberError(null);
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

    // Email validation
    if (!email.trim()) {
      setEmailError(t("validation.email.required"));
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(t("validation.email.invalid"));
      isValid = false;
    } else {
      setEmailError(null);
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

    // Confirm password validation
    if (!confirmPassword.trim()) {
    setConfirmPasswordError(t("validation.confirmPassword.required"));
    isValid = false;
    
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(t("validation.password.match"));
      isValid = false;
    
    } else {
      setConfirmPasswordError(null);
    }

    // Student Number validation
    if (!studentNumber.trim()) {
      setStudentNumberError(t("validation.studentNumber.required"));
      isValid = false;
    } else if (!/^[A-Za-z]\d{7}$/.test(studentNumber)) {
      setStudentNumberError(t("validation.studentNumber.format"));
      isValid = false;
    } else {
      setStudentNumberError(null);
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

    setStatusMessages([
      { message: t("register.success"), type: "success" },
    ]);

    sessionStorage.setItem("registeredUser", JSON.stringify({ name, email, studentNumber }));

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <div className={styles.userLoginPage}>
      <form onSubmit={handleSubmit} className={styles.userLoginForm}>
        <h3 className={styles.titleForm}>{t("register.registreer")}</h3>
        
        {/* Username Field */}
        <label className={styles.formLabels} htmlFor="nameInput">{t("register.gebruikersnaam")}</label>
        <input className={styles.inputField}
          id="nameInput"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        {nameError && <p className={errorStyles.errorMessage}>{nameError}</p>}

        {/* Student Number Field */}
        <label className={styles.formLabels} htmlFor="studentNumberInput">{t("register.studentnummer")}</label>
        <input className={styles.inputField}
          id="studentNumberInput"
          type="text"
          value={studentNumber}
          onChange={(event) => setStudentNumber(event.target.value)}
        />
        {studentNumberError && <p className={errorStyles.errorMessage}>{studentNumberError}</p>}

        {/* Email Field */}
        <label className={styles.formLabels} htmlFor="emailInput">{t("register.email")}</label>
        <input className={styles.inputField}
          id="emailInput"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {emailError && <p className={errorStyles.errorMessage}>{emailError}</p>}

        {/* Password Field */}
        <label className={styles.formLabels} htmlFor="passwordInput">{t("register.wachtwoord")}</label>
        <input className={styles.inputField}
          id="passwordInput"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {passwordError && <p className={errorStyles.errorMessage}>{passwordError}</p>}

        {/* Confirm Password Field */}
        <label className={styles.formLabels} htmlFor="confirmPasswordInput">{t("register.bevestigwachtwoord")}</label>
        <input className={styles.inputField}
          id="confirmPasswordInput"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        {confirmPasswordError && <p className={errorStyles.errorMessage}>{confirmPasswordError}</p>}

        {/* Status Messages */}
        {statusMessages.length > 0 && (
          <ul className={styles.userLoginStatusMessages}>
            {statusMessages.map(({ message, type }, index) => (
              <li key={index} className={type === "error" ? styles.error : styles.success}>
                {message}
              </li>
            ))}
          </ul>
        )}

        <button className={styles.loginButton} type="submit">{t("register.registreer")}</button>

        <Link href="/login">
          <button type="button" className={styles.registerButton}>
            {t("login.login")}
          </button>
        </Link>
        
      </form>
    </div>
  );
};

export default UserRegisterForm;
