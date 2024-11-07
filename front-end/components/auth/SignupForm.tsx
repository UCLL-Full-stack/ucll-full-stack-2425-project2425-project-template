import { useState } from "react";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 处理注册逻辑
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <div className="flex mb-4">
        <div className="flex flex-col w-full mr-2">
          <label className="mb-2 text-gray-700">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:border-gray-800 w-full"
          />
        </div>
        <div className="flex flex-col w-full ml-2">
          <label className="mb-2 text-gray-700">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:border-gray-800 w-full"
          />
        </div>
      </div>

      <label className="mb-2 text-gray-700">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 p-3 border rounded-lg focus:outline-none focus:border-gray-800 w-full"
      />

      <label className="mb-2 text-gray-700">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-3 border rounded-lg focus:outline-none focus:border-gray-800 w-full"
      />

      <label className="mb-2 text-gray-700">Repeat Password</label>
      <input
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        className="mb-6 p-3 border rounded-lg focus:outline-none focus:border-gray-800 w-full"
      />

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
