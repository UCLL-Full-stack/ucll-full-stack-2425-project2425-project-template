import Head from "next/head";
import Header from "@components/header";
import UserLoginForm from "@components/users/UserLoginForm";
import styles from '@styles/home.module.css';

const Login: React.FC = () => {
    const {t} = useTranslation();
    return (
        <>
            <Head>
                <title>User Login</title>
            </Head>
            <Header />
            <main className={styles.myEventsMain}>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserLoginForm />
                </section>
                <div className={styles.usersHomeTableHolder}>
                    <h2>{t("predefinedUserTable.title")}</h2>
                    <table className={styles.usersHomeTable}>
                        <thead>
                            <tr>
                                <th className={styles.usersTableth1}>{t("predefinedUserTable.email")}</th>
                                <th>{t("predefinedUserTable.password")}</th>
                                <th className={styles.usersTableth2}>{t("predefinedUserTable.role")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>admin@ucll.be</td>
                                <td>admin</td>
                                <td>{t("predefinedUserTable.admin")}</td>
                            </tr>
                            <tr>
                                <td>john.doe@ucll.be</td>
                                <td>passwordJohn</td>
                                <td>{t("predefinedUserTable.organizer")}</td>
                            </tr>
                            <tr>
                                <td>jane.doe@ucll.be</td>
                                <td>passwordJane</td>
                                <td>{t("predefinedUserTable.participant")}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
};

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
export const getServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default Login;
