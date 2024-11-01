import { Item } from "@types";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
    items: Item[] | [];
};

const ItemAdminOverview: React.FC<Props> = ({ items }: Props) => {

    const handleNavigate = (id: number) => {

        window.location.href = `/adminoverview/${id}/addNutritionlabel`;
    };
    return (
        <>
            {items && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="px-6 py-3 text-left font-semibold">Name</th>
                                <th className="px-6 py-3 text-left font-semibold">Price</th>
                                <th className="px-6 py-3 text-left font-semibold">Category</th>
                                <th className="px-6 py-3 text-left font-semibold">Add Nutrition Label</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr
                                    key={item.id}
                                    className={`${item.id % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                        } hover:bg-gray-100 transition-colors duration-200`}
                                >
                                    <td className="px-6 py-4 border-t border-gray-200">{item.name}</td>
                                    <td className="px-6 py-4 border-t border-gray-200">{item.price.toFixed(2)}€</td>
                                    <td className="px-6 py-4 border-t border-gray-200">{item.category}</td>
                                    {!item.nutritionlabel && (
                                        <td className="px-6 py-4 border-t border-gray-200">
                                            <button onClick={() => handleNavigate(item.id)}
                                                className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
                                            >
                                                Add Nutrition Label
                                            </button>
                                        </td>
                                    )}
                                    {item.nutritionlabel && (
                                        <td className="px-6 py-4 border-t border-gray-200">
                                            <button onClick={() => handleNavigate(item.id)}
                                                className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
                                            >
                                                Update the nutritionlabel
                                            </button>
                                        </td>
                                    )}

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div >
            )}
        </>
    );
};


export default ItemAdminOverview;