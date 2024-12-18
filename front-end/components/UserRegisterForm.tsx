import { StatusMessage } from "../types";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/UserLoginForm.module.css";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import errorStyles from "../styles/errorMessage.module.css";
import UserService from "@/services/UserService";

const UserRegisterForm: React.FC = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [role, setRole] = useState<"guest" | "student" | "admin">("guest");
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [studentNumberError, setStudentNumberError] = useState<string | null>(null);
  const [roleError, setRoleError] = useState<string | null>(null);
  const clearErrors = () => {
    setErrors({});
    setStatusMessages([]);
  };

  
  const validate = (): boolean => {
    let isValid = true;

    if (!firstName.trim()) {
        setFirstNameError(t("register.errors.firstNameRequired"));
        isValid = false;
    }
    if (!lastName.trim()) {
        setLastNameError(t("register.errors.lastNameRequired"));
        isValid = false;
    }
    if (!username.trim()) {
        setUsernameError(t("register.errors.usernameRequired"));
        isValid = false;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
        setEmailError(t("register.errors.invalidEmail"));
        isValid = false;
    }
    if (password.length < 8) {
        setPasswordError(t("register.errors.passwordTooShort"));
        isValid = false;
    }
    if (password !== confirmPassword) {
        setConfirmPasswordError(t("register.errors.passwordsDoNotMatch"));
        isValid = false;
    }
    if (role === "student" && !studentNumber.trim()) {
        setStudentNumberError(t("register.errors.studentNumberRequired"));
        isValid = false;
    }

    return isValid;
};

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearErrors();

    if (!validate()) {
      setStatusMessages([{ message: t("validation.failed"), type: "error" }]);
      return;
    }

    const user = { firstName, lastName, username, email, password, studentNumber, role };

    try {
      const response = await UserService.registerUser(user);

      if (response && response.success) {
        setStatusMessages([{ message: t("register.success"), type: "success" }]);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else if (response && response.message) {
        setStatusMessages([{ message: response.message, type: "error" }]);
      } else {
        setStatusMessages([{ message: t("register.error.generic"), type: "error" }]);
      }
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || t("register.error.server");
      setStatusMessages([{ message: errorMessage, type: "error" }]);
    }
  };

  return (
    <div className={styles.userLoginPage}>
      <form onSubmit={handleSubmit} className={styles.userLoginForm}>
        <h3 className={styles.titleForm}>{t("register.registreer")}</h3>

        {/* First Name */}
        <label className={styles.formLabels} htmlFor="firstNameInput">
          {t("register.firstName")}
        </label>
        <input
          className={styles.inputField}
          id="firstNameInput"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && <p className={errorStyles.errorMessage}>{errors.firstName}</p>}

        {/* Last Name */}
        <label className={styles.formLabels} htmlFor="lastNameInput">
          {t("register.lastName")}
        </label>
        <input
          className={styles.inputField}
          id="lastNameInput"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName && <p className={errorStyles.errorMessage}>{errors.lastName}</p>}

        {/* Username */}
        <label className={styles.formLabels} htmlFor="usernameInput">
          {t("register.username")}
        </label>
        <input
          className={styles.inputField}
          id="usernameInput"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <p className={errorStyles.errorMessage}>{errors.username}</p>}

        {/* Role */}
        <label className={styles.formLabels} htmlFor="roleInput">
          {t("register.role")}
        </label>
        <select
          className={styles.inputField}
          id="roleInput"
          value={role}
          onChange={(e) => setRole(e.target.value as "guest" | "student" | "admin")}
        >
          <option value="guest">{t("register.roles.guest")}</option>
          <option value="student">{t("register.roles.student")}</option>
          <option value="admin">{t("register.roles.admin")}</option>
        </select>

        {/* Student Number */}
        {role === "student" && (
          <>
            <label className={styles.formLabels} htmlFor="studentNumberInput">
              {t("register.studentNumber")}
            </label>
            <input
              className={styles.inputField}
              id="studentNumberInput"
              type="text"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
            />
            {errors.studentNumber && (
              <p className={errorStyles.errorMessage}>{errors.studentNumber}</p>
            )}
          </>
        )}

        {/* Email */}
        <label className={styles.formLabels} htmlFor="emailInput">
          {t("register.email")}
        </label>
        <input
          className={styles.inputField}
          id="emailInput"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className={errorStyles.errorMessage}>{errors.email}</p>}

        {/* Password */}
        <label className={styles.formLabels} htmlFor="passwordInput">
          {t("register.password")}
        </label>
        <input
          className={styles.inputField}
          id="passwordInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className={errorStyles.errorMessage}>{errors.password}</p>}

        {/* Confirm Password */}
        <label className={styles.formLabels} htmlFor="confirmPasswordInput">
          {t("register.confirmPassword")}
        </label>
        <input
          className={styles.inputField}
          id="confirmPasswordInput"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && (
          <p className={errorStyles.errorMessage}>{errors.confirmPassword}</p>
        )}

        {/* Status Messages */}
        {statusMessages.length > 0 && (
          <ul className={styles.userLoginStatusMessages}>
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={type === "error" ? styles.error : styles.success}
              >
                {message}
              </li>
            ))}
          </ul>
        )}

        <button className={styles.loginButton} type="submit">
          {t("register.registreer")}
        </button>

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
