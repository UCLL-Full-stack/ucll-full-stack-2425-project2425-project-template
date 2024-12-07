import Head from "next/head";
import { useEffect, useState } from "react";
import { Song } from "types";
import songService from "@services/SongService";
import SongsOverview from "@components/songs/SongsOverview";
import Header from "@components/header";
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