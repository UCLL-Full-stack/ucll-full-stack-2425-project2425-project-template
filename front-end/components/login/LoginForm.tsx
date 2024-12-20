import RegisterLoginService from "@/services/RegisterLoginService";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState<null | string>(null);
  const [passwordError, setPasswordError] = useState<null | string>(null);
  const [statusMessages, setStatusMessages] = useState<string | null>(null);

  const clearErrors = () => {
    setEmailError(null);
    setPasswordError(null);
    setStatusMessages(null);
  };

  const validate = (): boolean => {
    let result = true;

    if (!email && email.trim() === "") {
      setEmailError("Email is required");
      result = false;
    }
    if (!password && password.trim() === "") {
      setPasswordError("Password is required");
      result = false;
    }
    return result;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    try {
      const login = await RegisterLoginService.loginUser(email, password);

      if (login.token) {
        setStatusMessages("Login successful. Redirecting...");
        console.log(login);
    
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setStatusMessages("Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setStatusMessages("Login failed.");
    }
  };

  return (
    <>
      {statusMessages && (
        <div className="row">
          <ul className="list-none mb-3 mx-auto ">
            {statusMessages}
          </ul>
        </div>
      )}
      <form onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="emailInput" className="block mb-2 text-sm font-medium">
          Email:
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="emailInput"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
          />
          <p className="text-red-800">{emailError ? emailError : null}</p>
        </div>
        <label htmlFor="passwordInput" className="block mb-2 text-sm font-medium">
          Password:
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="passwordInput"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
          />
          <p className="text-red-800">{passwordError ? passwordError : null}</p>
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
