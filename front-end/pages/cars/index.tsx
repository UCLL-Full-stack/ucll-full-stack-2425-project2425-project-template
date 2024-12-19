import CarOverviewTable from "@/components/cars/CarOverviewTable";
import Header from "@/components/header";
import CarService from "@/services/CarService";
import { Car } from "@/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Cars: React.FC = () => {
    const router = useRouter();
    const [cars, setCars] = useState<Array<Car>>([]);
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);

    const getCars = async () => {
        const response = await CarService.getAllCars();
        const json = await response.json();
        setCars(json);
    }

    useEffect(() => {
        getCars();
    }, []);

    return (
        <>
            <Head>
                <title>Car Stock</title>
            </Head>
            <Header />
            <main className="flex flex-col items-center">
                <h1 className="text-3xl font-bold my-6">Car Stock</h1>
                <section>
                    {cars && <CarOverviewTable cars={cars} selectCar={setSelectedCar} />}
                    <button className="fixed bottom-6 right-10 bg-[#21b5ff] hover:bg-[#21b5ff97] rounded p-2.5 text-black" 
                    onClick={() => router.push("/cars/add")}
                    >
                        Add new car
                    </button>
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

export default Cars;