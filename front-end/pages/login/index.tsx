import Head from "next/head";
import { useEffect, useState } from "react";
import { Song } from "types";
import songService from "@services/songService";
import SongsOverview from "@components/songs/songsOverview";
import Header from "@components/Header";
import LoginOverview from "@components/login/LoginOverview";



const Login: React.FC = () => {

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Header />
            <main className="flex items-center justify-center min-h-screen bg-gray-100">
                <section className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                    <LoginOverview />
                </section>
            </main>
        </>
    );
};

export default Login;