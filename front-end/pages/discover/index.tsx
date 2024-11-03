import Header from "@/components/header";
import Head from "next/head";

const Discover: React.FC = () => {
    
    return (
        <>
            <Head>
                <title>Yadig</title>
            </Head>
            <div className="flex flex-col h-screen">
                <Header current="discover"/>
                <main className="flex-1 bg-bg1 p-10 overflow-y-auto">
                </main>
            </div>
        </>
    );
}

export default Discover;
