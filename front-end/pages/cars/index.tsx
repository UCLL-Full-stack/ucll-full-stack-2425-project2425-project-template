import CarOverviewTable from "@/components/cars/CarOverviewTable";
import Header from "@/components/header";
import CarService from "@/services/CarService";
import { Car } from "@/types";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const Cars: React.FC = () => {
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
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                    {cars && <CarOverviewTable cars={cars} selectCar={setSelectedCar} />}
                    <button className="fixed bottom-5 right-5 hover:bg-[#5c00b2] text-white font-bold py-2 px-4 rounded" >
                        <a href="/cars/add">add car</a>
                    </button>
                </section>
            </main>
        </>
    );
};

export default Cars;