
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
      <main className="bg-[url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bmw-m.com%2Fen%2Ffastlane%2Fbmw-individual.html&psig=AOvVaw1vkCW0PTP4e2HzOuVL2-k-&ust=1731792219598000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMiGvPWi34kDFQAAAAAdAAAAABAE')]">
        <span className="flex flex-row justify-center items-center">
        <h1 className="text-2xl flex justify center mt-10">Welcome to our homepage</h1>
        
        </span>
        
      </main>
    </>
  )
}

export default Home

