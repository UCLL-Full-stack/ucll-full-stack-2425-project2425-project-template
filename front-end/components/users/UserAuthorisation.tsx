import React, { useEffect, useState } from 'react';

interface UserAuthorisationProps {
  children: React.ReactNode;
}

const UserAuthorisation: React.FC<UserAuthorisationProps> = ({ children }) => {
  const [isAuthorised, setIsAuthorised] = useState<boolean | null>(null);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    setIsAuthorised(!!loggedInUser);
  }, []);

  if (isAuthorised === null) {
    return null; // or a loading spinner
  }

  if (!isAuthorised) {
    return <div className='authorisation-error'>
        <p>Error: You are not Authorised! Please Log in</p></div>;
  }

  return <>{children}</>;
};

export default UserAuthorisation;