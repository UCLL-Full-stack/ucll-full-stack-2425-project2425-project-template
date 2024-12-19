import CarPartOverviewTable from "@/components/carPart/carPartOverviewGrid";
import { CarPart } from "@/types";
import { useRouter } from "next/router";
import CarPartService from "@/services/CarPartService";
import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const carParts: React.FC = () => {
    const router = useRouter();
    const [carParts, setCarParts] = useState<Array<CarPart>>([]);
    const [selectedCarPart, setSelectedCarPart] = useState<CarPart | null>(null);

    const getCarParts = async () => {
        const response = await CarPartService.getAllCarParts();
        const json = await response.json();
        setCarParts(json);
    }

    useEffect(() => {
        getCarParts();
    }, []);

    return (
        <>
            <Head>
                <title>Car parts</title>
            </Head>
            <Header />
            <main className="flex flex-col items-center">
                <h1 className="text-3xl font-bold my-6">Car Parts</h1>
                <section>
                    {carParts && <CarPartOverviewTable carparts={carParts} />}
                </section>
            </main>

        </>
    );
};

export const getServerSideProps = async (context: { locale: any; }) => {
    const { locale } = context;
    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
    };
  };

export default carParts;