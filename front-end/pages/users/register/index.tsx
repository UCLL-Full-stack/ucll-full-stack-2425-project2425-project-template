import Header from "@/components/header";
import Footer from "@/components/footer";
import RegisterForm from "@/components/users/RegisterForm";
import UserService from "@/services/UserService";
import { User } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from '@/styles/Home.module.css';

const RegisterUser: React.FC = () => {
    const [user, setUser] = useState<User>({
        nationalRegisterNumber: "",
        name: "",
        email: "",
        password: "",
        birthDate: undefined,
        isAdministrator: false,
        phoneNumber: ""
    });

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await createUser();
        alert("User created!");
    }

    const handleInputChange = (field: keyof User, value: any) => {
        setUser({ ...user, [field]: value });
    };

    // useEffect(() =>{
    //     if (user) createUser();
    // }, [user]);

    const createUser = async () => {
        const response = await UserService.createUser(user);
    }

    return (
        <>
            <Head>
                <title>Register form</title>
                <meta name="description" content="Personal Finance Tracker app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon/favicon.ico" />
            </Head>
            <Header />
            <main className={styles.main}>
                <h1>Sign up</h1>
                <section>
                    {user && (
                        <RegisterForm user={user} handleSubmit={handleSubmit} handleInputChange={handleInputChange}/>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
};

export default RegisterUser;