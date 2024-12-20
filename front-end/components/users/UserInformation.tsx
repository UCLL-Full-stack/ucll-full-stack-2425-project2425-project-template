import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const UserInformation: React.FC = () => {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <section className="home-section">
      <h2 className="home-subtitle">{t("home.userInformation.title")}</h2>
      <table className="user-info-table">
        <thead>
          <tr>
            <th>{t("home.userInformation.email")}</th>
            <th>{t("home.userInformation.password")}</th>
            <th>{t("home.userInformation.role")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>admin@email.com</td>
            <td>admin</td>
            <td>Admin</td>
          </tr>
          <tr>
            <td>user1@email.com</td>
            <td>user1</td>
            <td>User</td>
          </tr>
          <tr>
            <td>moderator1@email.com</td>
            <td>moderator1</td>
            <td>Moderator</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default UserInformation;