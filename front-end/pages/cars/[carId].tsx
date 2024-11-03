import CarDetails from "@/components/cars/CarDetails";
import Header from "@/components/header";
import carService from "@/services/CarService";
import { Car } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CarById: React.FC = () => {
    const [car, setCars] = useState<Car | null>(null);

    const router = useRouter();
    const { carId } = router.query;
    
    const getCarById = async () => {
        const response = await carService.getCarById(carId as string);
        const json = await response.json();
        setCars(json);
    }  

    useEffect(() => {
        if(carId)getCarById();
    }, [carId]);

    return(
        <>
        <Header/>
        <main>
            {car && 
                <h2>{car.brand}{car.model}</h2>
            }
            {car &&
            <CarDetails car={car}/>
            }

        </main>
        </>
    )
}
export default CarById;