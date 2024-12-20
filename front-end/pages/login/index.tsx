import Header from "@/components/header";
import UserLoginForm from "@/components/users/UserLoginForm";
import Head from "next/head";

const Login: React.FC = () => {
  return (
    <>
      <Head>
        <title>User Signup</title>
      </Head>
      <Header />
      <main>
        <section className="p-6 min-h-screen flex flex-col items-center">
          <UserLoginForm />
        </section>
      </main>
    </>
  );
};

export default Login;
