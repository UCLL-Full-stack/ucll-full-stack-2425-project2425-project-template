import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Vehicle } from "@/types";
import VehicleService from "@/services/VehicleService";
import VehicleDetails from "@/components/vehicles/VehicleDetails";

const VehicleDetailsPage = () => {
  const router = useRouter();
  const { vehicleId } = router.query;
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (vehicleId) {
        console.log("Vehicle ID:", vehicleId);
      const fetchJob = async () => {
        try {
          const vehicleData = await VehicleService.getVehicleById(Number(vehicleId));
          setVehicle(vehicleData);
        } catch (err) {
          setError("Failed to load vehicle details.");
          console.error("Error fetching vehicle:", err);
        }
      };
      fetchJob();
    }
  }, [vehicleId]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!vehicle) {
    return <p>Loading...</p>;
  }

  return <VehicleDetails vehicle={vehicle}/>;
};

export default VehicleDetailsPage;
