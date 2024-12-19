import React, { useState } from "react";
import Login from "./Login";
import { useTranslation } from "next-i18next";

interface LoginButtonProps {
  isLoggedIn: boolean;
  onLogout: () => void; 
}

const LoginButton: React.FC<LoginButtonProps> = ({ isLoggedIn, onLogout }) => {
  const [showLogin, setShowLogin] = useState(false);
  const { t } = useTranslation(); 

  const toggleLogin = () => {
    setShowLogin((prev) => !prev);
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="relative">
      <button
        onClick={isLoggedIn ? handleLogout : toggleLogin}
        className={`font-bold py-2 px-4 rounded-lg transition ${
          isLoggedIn
            ? "bg-yellow-500 text-black hover:bg-red-500"
            : "bg-yellow-500 text-black hover:bg-green-500"
        }`}
      >
        {isLoggedIn ? t('login.out') : t('login.in')}
      </button>

      {showLogin && <Login onClose={toggleLogin} />}
    </div>
  );
};

export default LoginButton;
