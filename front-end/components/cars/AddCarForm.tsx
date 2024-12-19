import React, { useState } from 'react';
import { useRouter } from 'next/router';
import CarService from '@/services/CarService';

const AddCarForm: React.FC = () => {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState<number >(0);
    const [licensePlate, setLicensePlate] = useState('');
    const [price, setPrice] = useState<number>(0);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newCar = { brand, model, year, licensePlate, price };

        try {
            await CarService.addCar(newCar);
            router.push('/cars');
        } catch (error) {
            console.error("Failed to add car", error);
        }
    };

    const inputStyle = {
        backgroundColor: '#f0f0f0',
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
        marginTop: '0.5rem',
        marginBottom: '1rem',
        color: '#000',
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Brand</label>
                <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required style={inputStyle} />
            </div>
            <div>
                <label>Model</label>
                <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required style={inputStyle} />
            </div>
            <div>
                <label>Year</label>
                <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} required style={inputStyle} />
            </div>
            <div>
                <label>License Plate</label>
                <input type="text" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} required style={inputStyle} />
            </div>
            <div>
                <label>Price</label>
                <input type="number" step="0.01" value={price} onChange={(e) => setPrice(Number(e.target.value))} required style={inputStyle} />
            </div>

            <button className=' bg-[#21b5ff] hover:bg-[#21b5ff97] px-0.75 py-1.5 rounded p-2.5 text-black'
                type="submit"
                style={{
                    padding: '0.75rem 1.5rem',
                    color: 'black',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    marginTop: '1rem',
                }}
            >
                Add Car
            </button>
        </form>
    );
};

export default AddCarForm;