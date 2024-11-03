import Header from "@/components/header";
import RegisterForm from "@/components/users/RegisterForm";
import UserService from "@/services/UserService";
import { User } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const RegisterUser: React.FC = () => {
    const [user, setUser] = useState<User>({
        nationalRegisterNumber: "",
        name: "",
        email: "",
        password: "",
        birthDate: null,
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
            </Head>
            <Header />
            <main>
                <h1>Sign up</h1>
                <section>
                    {user && (
                        <RegisterForm user={user} handleSubmit={handleSubmit} handleInputChange={handleInputChange}/>
                    )}
                </section>
            </main>
        </>
    );
};

export default RegisterUser;