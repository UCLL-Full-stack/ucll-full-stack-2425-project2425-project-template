import { useState } from "react";
import { useRouter } from "next/router";
import authService from "@/services/authService";
import { LoginData } from "@/types/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    if (emailError || passwordError) {
      alert("Please fix the errors before submitting.");
      return;
    }

    // Call the login function from authService
    try {
      const data: LoginData = { email, password };
      const response = await authService.login(data);
      console.log(response);

      // Save the username in session storage
      sessionStorage.setItem("username", email);

      // Display success message
      setSuccessMessage("Login successful!");

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <label className="mb-2 text-gray-700">Email</label>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        className="mb-1 p-3 border rounded-lg focus:outline-none focus:border-gray-800"
      />
      {emailError && <p className="text-red-500">{emailError}</p>}

      <label className="mb-2 text-gray-700">Password</label>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        className="mb-1 p-3 border rounded-lg focus:outline-none focus:border-gray-800"
      />
      {passwordError && <p className="text-red-500">{passwordError}</p>}

      <button
        type="submit"
        className="bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Login
      </button>

      {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
    </form>
  );
};

export default LoginForm;
