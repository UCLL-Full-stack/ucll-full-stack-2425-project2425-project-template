import Head from "next/head";
import Header from "@/components/header";
import UserRegisterForm from "@/components/users/UserRegisterForm";
import React from "react";

const Register: React.FC = () => {
    return (
        <>
            <Head>
                <title>Register user</title>
            </Head>
            <Header />
            <main>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserRegisterForm />
                </section>
            </main>
        </>
    );
};
export default Register;