import Header from "@/components/header";
import Head from "next/head";

const Lists: React.FC = () => {
    
    return (
        <>
            <Head>
                <title>Yadig</title>
            </Head>
            <div className="flex flex-col h-screen">
                <Header current="lists"/>
                <main className="flex-1 bg-bg1 p-10 overflow-y-auto">
                </main>
            </div>
        </>
    );
}

export default Lists;
