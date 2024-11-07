import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthToggle = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      {/* 灰色背景框 */}
      <div className="flex bg-gray-200 p-1 rounded-full w-full mb-6">
        <button
          className={`flex-1 py-2 font-semibold rounded-full transition-colors ${
            isLogin ? "bg-white text-gray-800" : "bg-transparent text-gray-500"
          }`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`flex-1 py-2 font-semibold rounded-full transition-colors ${
            !isLogin ? "bg-white text-gray-800" : "bg-transparent text-gray-500"
          }`}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>
      {/* 条件渲染表单 */}
      {isLogin ? <LoginForm /> : <SignupForm />}
    </div>
  );
};

export default AuthToggle;
