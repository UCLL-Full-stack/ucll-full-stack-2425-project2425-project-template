
import Image from "next/image"
import styles from "@styles/home.module.css"
import Header from "@/components/header"
import Head from "next/head"


const Home: React.FC = () => {

  return (
    <>
      <Head>
        <title>Demo Project</title>
        <meta name="description" content="Exam app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="text-center md:mt-24 mx-auto md:w-3/5 lg:w-1/2">
        <span className="flex flex-row justify-center items-center">
          kashvdfjasvdsajdhksd
        </span>
      </main>
    </>
  )
}

export default Home

