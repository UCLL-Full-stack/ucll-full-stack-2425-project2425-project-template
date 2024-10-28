import userService from "@/services/userService";
import { StatusMessage } from "@/types";
import router from "next/router";
import React, { useState } from "react";


const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState<StatusMessage>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      name,
      firstname,
      password
    };
    console.log(user);

    userService.registerUser(user).then(async (response) =>{
    
      if(response.ok){
        setStatusMessage({ message: "User Added", type: "success" });
        setTimeout(() =>{
            router.push("/")
        }, 2000);
      } else {
        const jsonrespone = await response.json()
        setStatusMessage({ message: `${jsonrespone.message}`, type: "error" });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 mb-6 md:grid-cols-2 mx-64 mt-16">
      <div>
        <label htmlFor="name">name</label>
        <input
          id="name"
          type="text"
          value={name}
          placeholder={name}
          onChange={(e) => setName(e.target.value)} />

        <label htmlFor="firstname">firstname</label>
        <input
          id="firstname"
          type="text"
          value={firstname}
          placeholder={firstname}
          onChange={(e) => setFirstname(e.target.value)} />
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          value={password}
          placeholder={password}
          onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>{statusMessage && statusMessage.message}</div>
      <button type="submit">register</button>
    </form>
  );
};

export default RegisterForm;