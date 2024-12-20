import Head from "next/head";
import Header from "../components/Navbar";
import UserLoginForm from "../components/UserLoginForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import styles from "../styles/Index.module.css";

const Login: React.FC = () => {
    const { t } = useTranslation("common");

    const users = [
        {
          username: 'john_doe',
          email: 'john@example.com',
          role: 'student',
          firstName: 'John',
          lastName: 'Doe',
          password: 'Password123',
        },
        {
          username: 'admin_user',
          email: 'admin@example.com',
          role: 'admin',
          firstName: 'Admin',
          lastName: 'User',
          password: 'Adminpassword1', 
        },
        {
          username: 'guest_user',
          email: 'guest@example.com',
          role: 'guest',
          firstName: 'Guest',
          lastName: 'User',
          password: 'Guestpassword', 
        }
      ];


    return (
        <>
            <Head>
                <title>{t("login.titel")}</title>
            </Head>
            <Header />
            <main>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserLoginForm />
                </section>

                <section className={styles['users-table-section']}>
                    <div className={styles['table-container']}>
                        <table className={styles['users-table']}>
                            <thead>
                            <tr>
                                <th>{t("index.username")}</th>
                                <th>{t("index.email")}</th>
                                <th>{t("index.role")}</th>
                                <th>{t("index.firstname")}</th>
                                <th>{t("index.lastname")}</th>
                                <th>{t("index.password")}</th> 
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.password}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const  { locale} = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "nl", ["common"]))
        },
    };
};

export default Login;
