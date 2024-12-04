import Header from "@/components/header";
import RegisterForm from "@/components/registerForm";
import Head from "next/head";

const Register: React.FC = () => {
  return (
    <>
      <Head>
        <title>Register - Eventer</title>
        <meta name="description" content="Eventer home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header></Header>
      <RegisterForm></RegisterForm>
    </>
  );
};
export default Register;
