import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 处理登录逻辑
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">

      <label className="mb-2 text-gray-700">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 p-3 border rounded-lg focus:outline-none focus:border-gray-800"
      />

      <label className="mb-2 text-gray-700">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-6 p-3 border rounded-lg focus:outline-none focus:border-gray-800"
      />

      <button
        type="submit"
        className="bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Login
      </button>
    </form>

  );
};

export default LoginForm;
