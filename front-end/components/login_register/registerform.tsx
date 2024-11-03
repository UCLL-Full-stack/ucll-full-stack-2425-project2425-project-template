import userService from "@/services/userService";
import { Role, StatusMessage } from "@/types";
import router from "next/router";
import React, { useState } from "react";

const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student"); // Default role set to 'student'
  const [statusMessage, setStatusMessage] = useState<StatusMessage>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      name,
      firstname,
      password,
      role
    };
    console.log(user);

    userService.registerUser(user).then(async (response) => {
      if (response.ok) {
        setStatusMessage({ message: "User Added", type: "success" });
        sessionStorage.setItem("user", JSON.stringify({ name,firstname,role }));

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        const jsonResponse = await response.json();
        setStatusMessage({ message: `${jsonResponse.message}`, type: "error" });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-16 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <div className="grid gap-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="firstname" className="block text-gray-700 font-medium mb-2">Firstname</label>
          <input
            id="firstname"
            type="text"
            value={firstname}
            placeholder="Enter your firstname"
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-gray-700 font-medium mb-2">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="student">Student</option>
            <option value="lecturer">Lecturer</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        {statusMessage && (
          <p
            className={`text-center text-sm ${statusMessage.type === "success" ? "text-green-600" : "text-red-600"}`}
          >
            {statusMessage.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full mt-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
