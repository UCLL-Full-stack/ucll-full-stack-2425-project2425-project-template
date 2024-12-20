
import React from 'react';

interface UserAuthorisationProps {
  children: React.ReactNode;
}

const UserAuthorisation: React.FC<UserAuthorisationProps> = ({ children }) => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    return <div className='authorisation-error'>
        <p>Error: You are not Authorised! Please Log in</p></div>;
  }

  return <>{children}</>;
};

export default UserAuthorisation;