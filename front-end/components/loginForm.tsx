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
    setName("");
    setPasswordError("");
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
    const user = { username: name, password };
    const response = await UserService.loginUser(user);

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

  return <></>;
};

export default LoginForm;
