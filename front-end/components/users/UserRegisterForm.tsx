import UserService from "@services/UserService";
import { StatusMessage } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";

const UserRegisterForm: React.FC = () => {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const clearErrors = () => {
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!name || name.trim() === "") {
      setNameError(t('register.nameRequired'));
      result = false;
    }

    if (!email || email.trim() === "") {
      setEmailError(t('register.emailRequired'));
      result = false;
    }

    if (!password || password.trim() === "") {
      setPasswordError(t('register.passwordRequired'));
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }

    try {
      const user = { name, email, password };
      const response = await UserService.createUser(user);

      if (response.status === 200) {
        setStatusMessages([{ message: t('register.success'), type: "success" }]);

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setStatusMessages([{ message: t('register.error'), type: "error" }]);
      }
    } catch (error) {
      setStatusMessages([{ message: t('register.error'), type: "error" }]);
    }
  };

  return (
    <>
      <h3 className="px-0">{t('register.title')}</h3>
      {statusMessages && (
        <div className="row">
          <ul className="list-none mb-3 mx-auto ">
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={classNames({
                  "text-red-800": type === "error",
                  "text-green-800": type === "success",
                })}
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="nameInput" className="mb-4">
          {t('register.label.name')}
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="form-input"
          />
          {nameError && <div className="error-text">{nameError}</div>}
        </div>
        <label htmlFor="emailInput" className="mb-4">
          {t('register.label.email')}
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="emailInput"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="form-input"
          />
          {emailError && <div className="error-text">{emailError}</div>}
        </div>
        <div className="mb-4">
          <div>
            <label
              htmlFor="passwordInput"
              className="block mb-2 text-sm font-medium"
            >
              {t('register.label.password')}
            </label>
          </div>
          <div className="block mb-2 text-sm font-medium">
            <input
              id="passwordInput"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="form-input"
            />
            {passwordError && (
              <div className=" error-text">{passwordError}</div>
            )}
          </div>
        </div>
        <button
          className="btn-primary"
          type="submit"
        >
          {t('register.button')}
        </button>
      </form>
    </>
  );
};

export default UserRegisterForm;