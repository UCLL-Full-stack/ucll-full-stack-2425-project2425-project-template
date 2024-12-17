import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import UserService from "@/services/UserService";
import styles from '../styles/UserLoginForm.module.css';
import errorStyles from '../styles/errorMessage.module.css';
import Link from 'next/link';
import { StatusMessage } from '@/types';

const UserRegisterForm: React.FC = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [role, setRole] = useState<"guest" | "student" | "admin">("guest");

  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [studentNumberError, setStudentNumberError] = useState<string | null>(null);
  const [roleError, setRoleError] = useState<string | null>(null);

  const clearErrors = () => {
    setFirstNameError(null);
    setLastNameError(null);
    setUsernameError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
    setStudentNumberError(null);
    setRoleError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let isValid = true;
    // Perform validations as in the original code...
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearErrors();

    if (!validate()) {
      setStatusMessages([{ message: t("validation.failed"), type: "error" }]);
      return;
    }

    const user = { firstName, lastName, username, email, password, confirmPassword, studentNumber, role };

    try {
      const response = await UserService.registerUser(user); // Call to API to register user

      if (response.success) {
        setStatusMessages([{ message: t("register.success"), type: "success" }]);
        setTimeout(() => {
          router.push("/login"); // Redirect to login after successful registration
        }, 2000);
      } else {
        setStatusMessages([{ message: t("register.error"), type: "error" }]);
      }
    } catch (error) {
      setStatusMessages([{ message: t("register.error.server"), type: "error" }]);
    }
  };

  return (
    <div className={styles.userLoginPage}>
      <form onSubmit={handleSubmit} className={styles.userLoginForm}>
        <h3 className={styles.titleForm}>{t("register.registreer")}</h3>

        {/* First Name */}
        <label className={styles.formLabels} htmlFor="firstNameInput">{t("register.firstName")}</label>
        <input
          className={styles.inputField}
          id="firstNameInput"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {firstNameError && <p className={errorStyles.errorMessage}>{firstNameError}</p>}

        {/* Last Name */}
        <label className={styles.formLabels} htmlFor="lastNameInput">{t("register.lastName")}</label>
        <input
          className={styles.inputField}
          id="lastNameInput"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {lastNameError && <p className={errorStyles.errorMessage}>{lastNameError}</p>}

        {/* Username */}
        <label className={styles.formLabels} htmlFor="usernameInput">{t("register.username")}</label>
        <input
          className={styles.inputField}
          id="usernameInput"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {usernameError && <p className={errorStyles.errorMessage}>{usernameError}</p>}

        {/* Role */}
        <label className={styles.formLabels} htmlFor="roleInput">{t("register.role")}</label>
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
        {roleError && <p className={errorStyles.errorMessage}>{roleError}</p>}

        {/* Other Fields (Student Number, Email, Password) */}
        <label className={styles.formLabels} htmlFor="studentNumberInput">{t("register.studentNumber")}</label>
        <input
          className={styles.inputField}
          id="studentNumberInput"
          type="text"
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
        />
        {studentNumberError && <p className={errorStyles.errorMessage}>{studentNumberError}</p>}

        {/* Email */}
        <label className={styles.formLabels} htmlFor="emailInput">{t("register.email")}</label>
        <input
          className={styles.inputField}
          id="emailInput"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className={errorStyles.errorMessage}>{emailError}</p>}

        {/* Password */}
        <label className={styles.formLabels} htmlFor="passwordInput">{t("register.password")}</label>
        <input
          className={styles.inputField}
          id="passwordInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className={errorStyles.errorMessage}>{passwordError}</p>}

        {/* Confirm Password */}
        <label className={styles.formLabels} htmlFor="confirmPasswordInput">{t("register.confirmPassword")}</label>
        <input
          className={styles.inputField}
          id="confirmPasswordInput"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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