import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// For now my home page will be /planner -- so I moved the <Head/> to the planner page
export default function Home() {
  return (
    <>
      <Head>
        <title>Plateful</title>
      </Head>
      <main></main>
    </>
  );
}
