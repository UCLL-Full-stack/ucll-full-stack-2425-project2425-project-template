import { useRouter } from "next/router";
import { useState, useEffect, FormEvent } from "react";
import UserService from "@/services/UserService";
import { useToast } from "@/src/hooks/use-toast";
import { Toaster } from "@/src/components/ui/toaster";
import { StatusMessage } from "@/types";
import { useTranslation } from "next-i18next";
import Language from "../language/Language";

const LoginForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useTranslation();

  const clearErrors = () => {
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;
    if (email.trim() === "") {
      toast({
        title: "E-mail Error",
        description: "E-mail is required",
        variant: "destructive",
        style: { margin: "1rem", padding: "1.5rem" },
      });
      result = false;
    }
    if (password.trim() === "") {
      toast({
        title: `${t("login.validate.passwordError")}`,
        description: `${t("login.validate.password")}`,
        variant: "destructive",
        style: { margin: "1rem", padding: "1.5rem" },
      });
      result = false;
    }
    return result;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearErrors();
    if (!validate()) {
      return;
    }
    const user = { email, password };
    const response = await UserService.loginUser(user);

    if (response instanceof Response) {
      if (response.status === 200) {
        const userData = await response.json();
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            token: userData.token,
            email: userData.email,
            name: userData.name,
            role: userData.role,
          }),
        );
        sessionStorage.setItem("loggedInUser", name);
        console.log(userData);
        setStatusMessages([
          {
            message: "login successful ",
            type: "success",
          },
        ]);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else if (response.status === 401) {
        const errorResponse = await response.json();
        setStatusMessages([{ message: errorResponse.message, type: "error" }]);
      } else {
        const errorResponse = await response.json();
        setStatusMessages([
          {
            message: errorResponse.message || "login error",
            type: "error",
          },
        ]);
      }
    } else {
      setStatusMessages([
        {
          message: response.message || "login error",
          type: "error",
        },
      ]);
    }
  };

  return (
    <>
      <Toaster />
      <header className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-semibold">{t("login.title")}</h1>
      </header>
      <form onSubmit={handleSubmit} className="bg-[#dbdbdbcb] p-4 rounded-lg flex flex-col items-stretch w-full max-w-md">
        <div className="flex flex-col m-3">
          <label htmlFor="emailInput" className="font-medium">
            {t("login.label.email")}
          </label>
          <input
            className="border rounded p-2 bg-[#ffffff] text-black"
            id="emailInput"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="flex flex-col m-3">
          <label htmlFor="passwordInput" className="font-medium">
            {t("login.label.password")}
          </label>

          <input
            className="border rounded p-2 bg-[#ffffff] text-black"
            id="passwordInput"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button
          type="submit"
          className="p-2 mt-2 fs-6 text-white bg-[#21b5ff] hover:bg-[#21b5ff97] rounded-md"
        >
          <p>{t("login.button")}</p>
        </button>
        {statusMessages && (
          <ul>
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={type === "error" ? "text-red-600" : "text-green-800"}
              >
                {message}
              </li>
            ))}
          </ul>
        )}
      </form>
      <table className="md:w-4 ">
        <thead>
          <tr className=" bg-[#2c2c2c] flex flex-row items-center p-1 mt-5 text-white font-bold text-xl">
            <th className="w-56 m-2 px-5 p-3">{t("home.username")} </th>
            <th className="w-56 m-2 px-5 p-3">{t("home.email")} </th>
            <th className="w-56 m-2 px-5 p-3">{t("home.password")} </th>
            <th className="w-56 m-2 px-5 p-3">{t("home.role")} </th>
          </tr>
        </thead>
        <tbody>
          <tr className="flex flex-row items-center border-2 border-[#000000] font-semibold text-xl">
            <td className="w-56 m-2  px-5 p-2">admin1</td>
            <td className="w-56 m-2  px-5 p-2">admin@carshop.be</td>
            <td className="w-56 m-2  px-5 p-2">admin123</td>
            <td className="w-56 m-2  px-5 p-2">admin</td>
          </tr>
          <tr className="flex flex-row items-center border-b-2 border-l-2 border-r-2 border-[#000000] font-semibold text-xl">
            <td className="w-56 m-2  px-5 p-2">manager1</td>
            <td className="w-56 m-2  px-5 p-2">manager@carshop.be</td>
            <td className="w-56 m-2  px-5 p-2">manager123</td>
            <td className="w-56 m-2  px-5 p-2">manager</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default LoginForm;
