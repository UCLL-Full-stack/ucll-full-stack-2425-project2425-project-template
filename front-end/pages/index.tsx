import React from "react";
import Header from "@/components/header";
import Head from "next/head";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>
      <header>
        <nav>
      <Header />
      </nav>
      </header>

      <main>
        <h1>Welcom to your Grocery management x app </h1>
        <h2>Manage your shopping lists and know what you need to buy</h2>
      </main>
    </>
  );
}

export default Home
