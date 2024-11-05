import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Courses</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <span>
          <h1>Welcome!</h1>
        </span>

        <div className={styles.description}>
          <p>
          This project aims to build a Project Management Tool that helps teams plan, execute, and
          monitor their projects and tasks. The system will enable users to create and manage projects,
          assign tasks and roles, form teams, and track progress in real time.
          </p>
        </div>
      </main>
    </>
  );
}
