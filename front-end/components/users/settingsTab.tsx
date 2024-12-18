import { User } from "@/types";
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import UserService from "@/services/UserService";

type Props = { user: User };

const Settings: React.FC<Props> = ({ user }: Props) => {
  const { t } = useTranslation();
//   const [originalUser, setOriginalUser] = useState(user); 
  const [updatedUser, setUpdatedUser] = useState<User>(user);

  const handleInputChange = (field: keyof User, value: any) => {
    setUpdatedUser((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const updateUser = async () => {
    await UserService.updateUser(user.nationalRegisterNumber, updatedUser);
  } 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    updateUser();
    console.log('Updated User:', updatedUser);
  };

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  return (
    <>
      {updatedUser  && (
        <div>
          <h1>Profile Details</h1>
          <section className={styles.userDetails}>
            <form onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>{t("userDetails.name")}:</td>
                    <td>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={updatedUser.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        onClick={() => handleInputChange("name", '')}
                        onBlur={() => {if (updatedUser.name === '') handleInputChange("name", user.name)}} 
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>{t("userDetails.phoneNumber")}:</td>
                    <td>
                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={updatedUser.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        onClick={() => handleInputChange("phoneNumber", '')}
                        onBlur={() => {if (updatedUser.phoneNumber === '') handleInputChange("phoneNumber", user.phoneNumber)}}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>E-mail:</td>
                    <td>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={updatedUser.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        onClick={() => handleInputChange("email", '')}
                        onBlur={() => {if (updatedUser.email === '') handleInputChange("email", user.email)}}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>{t("userDetails.nationalRegisterNumber")}:</td>
                    <td>{updatedUser.nationalRegisterNumber}</td>
                  </tr>
                  <tr>
                    <td>{t("userDetails.birthDate")}:</td>
                    <td>
                      <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={updatedUser.birthDate ? new Date(updatedUser.birthDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => handleInputChange("birthDate", e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button type="submit" onSubmit={handleSubmit}>Save Changes</button>
            </form>
          </section>
        </div>
      )}
    </>
  );
};

export default Settings;
