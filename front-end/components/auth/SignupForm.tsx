import { useState } from "react";
import { RegisterData } from "@/types/auth";
import authService from "@/services/authService";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    if (!value) {
      setFirstNameError("First name is required.");
    } else {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    if (!value) {
      setLastNameError("Last name is required.");
    } else {
      setLastNameError("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (!value.includes("@")) {
      setEmailError("Invalid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
    } else {
      setPasswordError("");
    }
  };

  const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRepeatPassword(value);
    if (value !== password) {
      setRepeatPasswordError("Passwords do not match.");
    } else {
      setRepeatPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !repeatPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (firstNameError || lastNameError || emailError || passwordError || repeatPasswordError) {
      alert("Please fix the errors before submitting.");
      return;
    }

    // Call the register function from the auth service
    try {
      const data: RegisterData = { firstName, lastName, email, password };
      const response = await authService.register(data);
      console.log(response);
      // 处理注册成功后的逻辑，例如显示成功消息，重定向等
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <div className="flex mb-4">
        <div className="flex flex-col w-full mr-2">
          <label className="mb-2 text-gray-700">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            className="p-3 border rounded-lg focus:outline-none focus:border-gray-800 w-full"
          />
          {firstNameError && <p className="text-red-500">{firstNameError}</p>}
        </div>
        <div className="flex flex-col w-full ml-2">
          <label className="mb-2 text-gray-700">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            className="p-3 border rounded-lg focus:outline-none focus:border-gray-800 w-full"
          />
          {lastNameError && <p className="text-red-500">{lastNameError}</p>}
        </div>
      </div>

      <label className="mb-2 text-gray-700">Email</label>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        className="mb-4 p-3 border rounded-lg focus:outline-none focus:border-gray-800 w-full"
      />
      {emailError && <p className="text-red-500">{emailError}</p>}

      <label className="mb-2 text-gray-700">Password</label>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        className="mb-4 p-3 border rounded-lg focus:outline-none focus:border-gray-800 w-full"
      />
      {passwordError && <p className="text-red-500">{passwordError}</p>}

      <label className="mb-2 text-gray-700">Repeat Password</label>
      <input
        type="password"
        value={repeatPassword}
        onChange={handleRepeatPasswordChange}
        className="mb-6 p-3 border rounded-lg focus:outline-none focus:border-gray-800 w-full"
      />
      {repeatPasswordError && <p className="text-red-500">{repeatPasswordError}</p>}

      <button
        type="submit"
        className="bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors w-full"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
