
import type { AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";  // Import global styles here

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <React.Fragment>
            <Component {...pageProps} />
        </React.Fragment>
    );
};

export default MyApp;
