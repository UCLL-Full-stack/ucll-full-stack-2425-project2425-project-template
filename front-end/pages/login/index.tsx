import Header from "@/components/header";
import LoginForm from "@/components/loginForm";
import Head from "next/head";

const LoginPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Login - Eventer</title>
        <meta name="description" content="Eventer home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header></Header>
      <p>
        Please Log in!
      </p>
      <LoginForm></LoginForm>
    </>
  );
};
export default LoginPage;
