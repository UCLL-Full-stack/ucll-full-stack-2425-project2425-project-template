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
                <table className="w-100 m-14">
                <thead className="bg-blue-200 border-b-blue-400 border-b-8">
                    <tr>
                        <th className="px-12 py-5 text-xl">Username</th>
                        <th className="px-12 py-5 text-xl">Password</th>
                        <th className="px-12 py-5 text-xl">Role</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-300 border-b-gray-600 border-b-8">
                    <tr>
                        <td className="px-12 py-5">admin</td>
                        <td className="px-12 py-5">admin123</td>
                        <td className="px-12 py-5">admin</td>
                    </tr>
                    <tr>
                        <td className="px-12 py-5">niko</td>
                        <td className="px-12 py-5">niko123</td>
                        <td className="px-12 py-5">user</td>
                    </tr>
                    <tr>
                        <td className="px-12 py-5">ward</td>
                        <td className="px-12 py-5">ward123</td>
                        <td className="px-12 py-5">artist</td>
                    </tr>
                </tbody>
            </table>
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