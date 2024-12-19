import UserService from "@services/UserService";
import { StatusMessage } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";

const UserLoginForm: React.FC = () => {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const clearErrors = () => {
    setNameError(null);
    setPasswordError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!name || name.trim() === "") {
      setNameError(t('login.name'));
      result = false;
    }

    if (!password || password.trim() === "") {
      setPasswordError(t('login.password'));
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
      const user = { username: name, password };
      const response = await UserService.loginUser(user);

      if (response.status === 200) {
        setStatusMessages([{ message: t('login.success'), type: "success" }]);

        const user = await response.json();

        localStorage.setItem("loggedInUser", JSON.stringify({
          token: user.token,
          fullname: user.fullname,
          username: user.username,
          role: user.role
        }));

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setStatusMessages([{ message: t('login.error'), type: "error" }]);
      }
    } catch (error) {
      setStatusMessages([{ message: t('login.error'), type: "error" }]);
    }
  };

  return (
    <>
      <h3 className="px-0">{t('login.title')}</h3>
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
          {t('login.label.email')}
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
        <div className="mb-4">
          <div>
            <label
              htmlFor="passwordInput"
              className="block mb-2 text-sm font-medium"
            >
              {t('login.label.password')}
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
          {t('login.button')}
        </button>
      </form>
    </>
  );
};

export default UserLoginForm;