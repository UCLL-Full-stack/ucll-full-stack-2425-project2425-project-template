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

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    studentNumber: "",
    role: "guest",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const { firstName, lastName, username, email, password, confirmPassword, studentNumber, role } =
      formValues;

    if (!firstName.trim()) newErrors.firstName = t("register.errors.firstNameRequired");
    if (!lastName.trim()) newErrors.lastName = t("register.errors.lastNameRequired");
    if (!username.trim()) newErrors.username = t("register.errors.usernameRequired");

    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = t("register.errors.invalidEmail");
    }

    if (password.length < 8) newErrors.password = t("register.errors.passwordTooShort");
    if (password !== confirmPassword) {
      newErrors.confirmPassword = t("register.errors.passwordsDoNotMatch");
    }

    if (role === "student" && !studentNumber.trim()) {
      newErrors.studentNumber = t("register.errors.studentNumberRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setStatusMessages([]);
  
    if (!validate()) {
      setStatusMessages([{ message: t("validation.failed"), type: "error" }]);
      return;
    }
  
    const { firstName, lastName, username, email, password, studentNumber, role } = formValues;
  
    const user: { firstName: string; lastName: string; username: string; email: string; password: string; role: string; studentNumber?: string } = {
      firstName,
      lastName,
      username,
      email,
      password,
      role,
    };
  
    if (role === "student" && studentNumber) {
      user.studentNumber = studentNumber;
    }
  
    try {
      const response = await UserService.registerUser(user);
  
      if (response.success) {
        setStatusMessages([{ message: t("register.success"), type: "success" }]);
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setStatusMessages([{ message: response.message || t("register.errors.generic"), type: "error" }]);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || t("register.errors.server");
      setStatusMessages([{ message: errorMessage, type: "error" }]);
    }
  };
  

  return (
    <div className={styles.userLoginPage}>
      <form onSubmit={handleSubmit} className={styles.userLoginForm}>
        <h3 className={styles.titleForm}>{t("register.registreer")}</h3>

        {/* First Name */}
        <label htmlFor="firstName" className={styles.formLabels}>
          {t("register.voornaam")}
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={formValues.firstName}
          onChange={handleChange}
          className={styles.inputField}
        />
        {errors.firstName && <p className={errorStyles.errorMessage}>{errors.firstName}</p>}

        {/* Last Name */}
        <label htmlFor="lastName" className={styles.formLabels}>
          {t("register.achternaam")}
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={formValues.lastName}
          onChange={handleChange}
          className={styles.inputField}
        />
        {errors.lastName && <p className={errorStyles.errorMessage}>{errors.lastName}</p>}

        {/* Username */}
        <label htmlFor="username" className={styles.formLabels}>
          {t("register.gebruikersnaam")}
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={formValues.username}
          onChange={handleChange}
          className={styles.inputField}
        />
        {errors.username && <p className={errorStyles.errorMessage}>{errors.username}</p>}

        {/* Role */}
        <label htmlFor="role" className={styles.formLabels}>
          {t("register.rol")}
        </label>
        <select
          id="role"
          name="role"
          value={formValues.role}
          onChange={handleChange}
          className={styles.inputField}
        >
          <option value="guest">{t("register.roles.guest")}</option>
          <option value="student">{t("register.roles.student")}</option>
          <option value="admin">{t("register.roles.admin")}</option>
        </select>

        {/* Student Number */}
        {formValues.role === "student" && (
          <>
            <label htmlFor="studentNumber" className={styles.formLabels}>
              {t("register.studentennummer")}
            </label>
            <input
              id="studentNumber"
              name="studentNumber"
              type="text"
              value={formValues.studentNumber}
              onChange={handleChange}
              className={styles.inputField}
            />
            {errors.studentNumber && <p className={errorStyles.errorMessage}>{errors.studentNumber}</p>}
          </>
        )}

        {/* Email */}
        <label htmlFor="email" className={styles.formLabels}>
          {t("register.email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
          className={styles.inputField}
        />
        {errors.email && <p className={errorStyles.errorMessage}>{errors.email}</p>}

        {/* Password */}
        <label htmlFor="password" className={styles.formLabels}>
          {t("register.wachtwoord")}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
          className={styles.inputField}
        />
        {errors.password && <p className={errorStyles.errorMessage}>{errors.password}</p>}

        {/* Confirm Password */}
        <label htmlFor="confirmPassword" className={styles.formLabels}>
          {t("register.bevestigwachtwoord")}
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formValues.confirmPassword}
          onChange={handleChange}
          className={styles.inputField}
        />
        {errors.confirmPassword && (
          <p className={errorStyles.errorMessage}>{errors.confirmPassword}</p>
        )}

        {/* Status Messages */}
        {statusMessages.length > 0 && (
          <ul className={errorStyles.userLoginStatusMessages}>
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={type === "error" ? errorStyles.error : errorStyles.success}
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
