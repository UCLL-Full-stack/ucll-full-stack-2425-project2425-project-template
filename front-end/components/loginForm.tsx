import UserService from "@/services/UserService";
import { useState } from "react";
import { StatusMessage } from "@/types";

const LoginForm: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const clearErrors = () => {
    setNameError("");
    setPasswordError("");
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (name?.trim() === "") {
      setNameError("Name is required.");
      result = false;
    }
    if (password?.trim() === "") {
      setPasswordError("Password is required.");
    }
    return result;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }
    const user = { userName: name, password };
    const response = await UserService.loginUser(user);

    console.log("in log in form" + response);

    if (response.status === 200) {
      setStatusMessages([
        { message: "Login succesful, redirecting...", type: "success" },
      ]);
    } else if (response.status === 401) {
      const { errorMessage } = await response.json();
      setStatusMessages([{ message: errorMessage, type: "error" }]);
    } else {
      setStatusMessages([
        {
          message: "An error has occurred. Please try again later.",
          type: "error",
        },
      ]);
    }
  };

  return <>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div>{nameError}</div>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>{passwordError}</div>
      </div>
      <button type="submit">Login</button>
    </form>
    {statusMessages.map((message, index) => (
      <div key={index} className={message.type}>
        {message.message}
      </div>
    ))}
  </>;
};

export default LoginForm;
