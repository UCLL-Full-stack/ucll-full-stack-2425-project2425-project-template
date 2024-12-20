import { StatusMessage } from 'types';
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import UserService from '@services/userService';

const LoginOverview: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const router = useRouter();

    const clearErrors = () => {
        setNameError(null);
        setPasswordError(null);
        setStatusMessages([]);
      };
    
      const validate = (): boolean => {
        let result = true;
    
        if (!username && username.trim() === "") {
          setNameError("Name is required");
          result = false;
        }
    
        if (!password && password.trim() === "") {
          setPasswordError("Password is required");
          result = false;
        }
    
        return result;
      };
    
      const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    
        clearErrors();
    
        if (!validate()) {
          return;
        }
    
        const user = {username , password}
        const response = await UserService.loginUser(user)
    
        if (response.status == 200) {
          setStatusMessages([
            {
              message: "Succes",
              type: "success",
            },
          ]);
      
          const user = await response.json()
          console.log(user)
          localStorage.setItem("loggedInUser",
            JSON.stringify({
              token: user.token,
              fullname: user.fullname,
              username: user.username,
              role: user.role,
              id: user.id,
              subscription: user.subscription,
            })
          );
      
          setTimeout(() => {
            router.push("/");
          }, 2000);
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


    
      return (
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-center text-gray-700">
            Login
          </h2>
          
          {statusMessages && (
            <div className="mt-4">
              <ul className="list-none mb-3 mx-auto text-sm">
                {statusMessages.map(({ message, type }, index) => (
                  <li
                    key={index}
                    className={classNames("mb-1", {
                      "text-red-800": type === "error",
                      "text-green-800": type === "success",
                    })}
                  >
                    {message}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600" htmlFor="nameInput">
                Username
              </label>
              <input
                id="nameInput"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="username"
              />
              {nameError && <div className="text-red-800 text-sm mt-1">{nameError}</div>}
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600" htmlFor="passwordInput">
                Password
              </label>
              <input
                id="passwordInput"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="password"
              />
              {passwordError && <div className="text-red-800 text-sm mt-1">{passwordError}</div>}
            </div>
            
            <button
              className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="submit"
            >
              Login
            </button>
          </form>
          
          <p className="mt-4 text-sm text-center text-gray-600">
            No Account?
            <a href="/signup" className="text-blue-600 hover:underline"> SignUp</a>
          </p>
        </div>
      );
    };
    
export default LoginOverview;
