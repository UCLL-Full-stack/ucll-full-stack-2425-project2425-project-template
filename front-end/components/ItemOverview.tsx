import { Item } from '@types';
import React from 'react';
import { Plus } from 'lucide-react';
import Image from 'next/image';

type Props = {
    items: Item[] | [];
};

const ItemsOverview: React.FC<Props> = ({ items }: Props) => {
    return (
        <>
            {items && (
                <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {items.map((item) => (
                        <div key={item.id} className="border-2 border-black rounded-lg overflow-hidden flex flex-col h-full">
                            {/* Image with consistent height */}
                            <div className="h-48 w-full relative">
                                <img
                                    src={item.pathToImage}
                                    className='w-full h-full object-cover'
                                    alt={`${item.name} image`}
                                />
                            </div>

                            {/* Content with consistent height */}
                            <div className='flex justify-between items-center p-4 h-full'>
                                <div>
                                    <h2 className="text-lg font-semibold">{item.name}</h2>
                                    <p className="text-sm text-gray-500">{item.price}</p>
                                </div>
                                <span role='button' className="p-2 rounded-full hover:bg-gray-200">
                                    <Plus />
                                </span>
                            </div>
                        </div>
                    ))}
                </section>
            )}
        </>
    );
};

export default ItemsOverview;
