import { AppProps } from "next/app";
import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Component {...pageProps} />
      </main>
    </div>
  );
};

export default appWithTranslation(App);
