import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Header from "@/components/header";
import Head from "next/head";

export default function Home() {
  return (
      <>
        <Head>
          <title>Train</title>
          <meta name="description" content="Train ticket/subscription" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main className={styles.main}>
          <p>Under Construction</p>
        </main>
      </>
  );
}
