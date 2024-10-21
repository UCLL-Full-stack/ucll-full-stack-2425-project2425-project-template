import React from "react";


const RegisterForm: React.FC = () => {
  return (
    <>
      <form>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;