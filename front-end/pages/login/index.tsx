import Head from "next/head";
import { useEffect, useState } from "react";
import { Song } from "types";
import songService from "@services/songService";
import SongsOverview from "@components/songs/songsOverview";
import Header from "@components/Header";
import LoginOverview from "@components/login/LoginOverview";
import { useTranslation } from "react-i18next";
import React from 'react';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";



const Login: React.FC = () => {

    const { t } = useTranslation();

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

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { locale } = context;
  
    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
    };
  };


export default Login;