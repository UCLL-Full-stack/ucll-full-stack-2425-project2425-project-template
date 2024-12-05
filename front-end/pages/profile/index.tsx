import Header from "@/components/header";
import ProfileForm from "@/components/profileForm";
import React, { useState } from "react";
import Head from "next/head";

const ProfilePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Profile - Eventer</title>
        <meta name="description" content="Eventer home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header></Header>
      <ProfileForm></ProfileForm>
    </>
  );
};
export default ProfilePage;
