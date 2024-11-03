import { Item } from '@types';
import React from 'react';
import { Plus, ChevronDown } from 'lucide-react';

type Props = {
    items: Item[] | [];
    selectItem: (item: Item) => void;
};

const ItemsOverview: React.FC<Props> = ({ items, selectItem }: Props) => {
    return (
        <>
            {items && (
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="border-2 border-black rounded-lg overflow-hidden flex flex-col h-full"
                        >
                            <div className="h-48 w-full relative">
                                <img
                                    src={item.pathToImage}
                                    className="w-full h-full object-cover"
                                    alt={`${item.name} image`}
                                />
                            </div>

                            <div className="flex justify-between items-center p-4 h-full">
                                <div>
                                    <h2 className="text-lg font-semibold">{item.name}</h2>
                                    <p className="text-sm text-gray-500">{item.price} €</p>
                                </div>
                                <span
                                    role="button"
                                    className="p-2 rounded-full hover:bg-gray-200 transition-all"
                                >
                                    <Plus />
                                </span>
                            </div>
                            <span
                                role="button"
                                onClick={() => {
                                    selectItem(item);
                                }}
                                className="p-2 hover:bg-gray-200  flex justify-center transition-all"
                            >
                                <ChevronDown />
                            </span>
                        </div>
                    ))}
                </section>
            )}
        </>
    );
};

export default ItemsOverview;
