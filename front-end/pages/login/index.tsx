import Head from "next/head";
import LoginForm from "@/components/login/LoginForm";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main>
        <h1>Login</h1>
        <LoginForm />
      </main>
    </>
  );
};

export default LoginPage;
