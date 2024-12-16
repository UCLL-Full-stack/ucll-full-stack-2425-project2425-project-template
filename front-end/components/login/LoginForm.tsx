import { useRouter } from "next/router";
import { useState, useEffect, FormEvent } from "react";
import UserService from "@/services/UserService";
import { useToast } from "@/src/hooks/use-toast";
import { Toaster } from "@/src/components/ui/toaster";
import { StatusMessage } from "@/types";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();
  const { toast } = useToast();

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
        title: "Password Error",
        description: "Password is required",
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
            username: userData.username,
            role: userData.role,
          })
        );
        sessionStorage.setItem("loggedInUser", userData.username);
        setStatusMessages([
          {
            message: 'login.success',
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
            message: errorResponse.message || 'login.error',
            type: "error",
          },
        ]);
      }
    } else {
      setStatusMessages([
        {
          message: response.message || 'login.error',
          type: "error",
        },
      ]);
    }
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="emailInput" className="font-medium">
            Email
          </label>
          <input
            className=" rounded p-2 bg-[#ffffff] text-black"
            id="emailInput"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="passwordInput" className="font-medium">
            Password
          </label>

          <input
            className=" rounded p-2 bg-[#ffffff] text-black"
            id="passwordInput"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button
          type="submit"
          className="h-9 bg-[#0162ff] rounded text-white hover:bg-[#0022cd] self-stretch"
        >
          <p>Login</p>
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
    </>
  );
};

export default LoginForm;
