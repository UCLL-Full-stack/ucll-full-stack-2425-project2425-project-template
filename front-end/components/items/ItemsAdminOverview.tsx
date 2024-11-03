import { Item } from '@types';
import Link from 'next/link';
import React from 'react';

type Props = {
    items: Item[] | [];
};

const ItemAdminOverview: React.FC<Props> = ({ items }: Props) => {
    return (
        <>
            {items && (
                <div className="overflow-x-auto rounded-lg border border-gray-300 ">
                    <table className="min-w-full bg-white text-center rounded-lg">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="px-6 py-3 text-center font-semibold">Name</th>
                                <th className="px-6 py-3 text-center font-semibold">Price</th>
                                <th className="px-6 py-3 text-center font-semibold">Category</th>
                                <th className="px-6 py-3 text-center font-semibold">Image</th>
                                <th className="px-6 py-3 text-center font-semibold">
                                    Add Nutrition Label
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr
                                    key={item.id ?? Math.random()}
                                    className={`${
                                        item.id && item.id % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                    } hover:bg-gray-100 transition-colors duration-200`}
                                >
                                    <td className="px-6 py-4 border-t border-gray-200">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4 border-t border-gray-200">
                                        {item.price.toFixed(2)}€
                                    </td>
                                    <td className="px-6 py-4 border-t border-gray-200">
                                        {item.category}
                                    </td>
                                    <td className="px-6 py-4 border-t border-gray-200">
                                        <Link href={item.pathToImage} target="_blank">
                                            <img
                                                src={item.pathToImage}
                                                alt={`Image of ${item.name.toLowerCase()}`}
                                                className="w-28 h-18 m-auto"
                                            />
                                        </Link>
                                    </td>

                                    <td className="px-6 py-4 border-t border-gray-200">
                                        <Link
                                            href={`/itemOverview/${item.id}/addNutritionlabel`}
                                            className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
                                        >
                                            {item.nutritionlabel ? (
                                                <span>Update Nutrition Label</span>
                                            ) : (
                                                <span>Add Nutrition Label</span>
                                            )}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default ItemAdminOverview;
