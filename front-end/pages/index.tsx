import Head from "next/head";
import Header from "../components/header";

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Welcome to the Animal Management System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <div className="text-center mt-8">
          <h1 className="text-4xl font-bold mb-8">Welcome to the Animal Management System</h1>
          <p className="text-lg text-gray-300 mb-4">
            This system helps you manage animals, caretakers, and expenses efficiently.
          </p>
          <p className="text-lg text-gray-300 mb-4">
            You can view and manage information about different species, track animal details, and monitor expenses.
          </p>
          <p className="text-lg text-gray-300">
            Use the navigation menu to explore the various features of the system.
          </p>
        </div>
      </main>
    </>
  );
}