import CarOverviewTable from "@/components/cars/CarOverviewTable";
import Header from "@/components/header";
import CarService from "@/services/CarService";
import { Car } from "@/types";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Cars:React.FC= () => {
    const [cars, setCars] = useState<Array<Car>>([]);
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);

    const getCars = async () => {
        const response = await CarService.getAllCars();
        const json = await response.json();
        setCars(json);
    }

    useEffect(() => {
        getCars();
    }
    , []);

  return (
    <>
    <Head>
        <title>cars</title>
    </Head>
    <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Cars</h1>
        <section>
            <h2>Cars overview</h2>
            {cars && <CarOverviewTable cars={cars} selectCar={setSelectedCar} />}
            {selectedCar && 
                <h2>Details of {selectedCar.brand} {selectedCar.model}</h2>
            }
        </section>
      </main>
    </>
  );
}
    export default Cars;