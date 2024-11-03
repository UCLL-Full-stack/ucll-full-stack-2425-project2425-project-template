import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/header/header";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>ISP</title>
        <meta name="description" content="ISP" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
      </Head>
      <div className="font-poppins text-white font-bold text-sm">
        <Header />
        <main className={styles.main}>
          <h1>Welcome to the ISP submission system</h1>
          <p>
            This is the system where you can submit your ISP. Please log in to
            continue.
          </p>
        </main>
      </div>
    </>
  );
}
