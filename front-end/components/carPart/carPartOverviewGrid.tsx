import { CarPart } from "@/types";
import { useState } from "react";

type Props = {
  carparts: Array<CarPart>;
};

const CarPartOverviewGrid: React.FC<Props> = ({ carparts = [] }: Props) => {
  const [input, setInput] = useState('');

  const filteredCarParts = carparts.filter((carpart) =>
    carpart.name.toLowerCase().includes(input.toLowerCase())
  );
  return (
    <div className="p-4">
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full max-w-2xl p-2 border border-black rounded-md "/>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCarParts.map((carpart) => (
          <div
            key={carpart.id}
            className={`p-5 border rounded-lg ${carpart.quantity > 0 ? 'bg-green-100' : 'bg-red-100'
              }`}
          >
            <h3 className="text-lg font-medium text-center">{carpart.name}</h3>
            <p className="text-center">Price: ${carpart.price}</p>
            <p
              className={`text-center font-semibold ${carpart.quantity > 0 ? 'text-green-700' : 'text-red-700'
                }`}
            >
              {carpart.quantity > 0 ? 'In stock!' : 'Out of stock!'}
            </p>
            <p className="text-center" >Quantity: {carpart.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarPartOverviewGrid;