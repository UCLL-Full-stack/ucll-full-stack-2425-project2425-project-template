import Head from "next/head";
import ProductsTable from "@/components/products/ProductsTable";
import axios from "axios";
import { useEffect, useState } from "react";
import RegisterForm from "@/components/register/RegisterForm";

const RegisterPage = () => {

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <main>
        <h1>Register</h1>
        <RegisterForm/>
      </main>
    </>
  );
};

export default RegisterPage;
