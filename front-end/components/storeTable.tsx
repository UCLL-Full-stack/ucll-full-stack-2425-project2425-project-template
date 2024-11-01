import React, { useEffect, useState } from 'react';
import { Game } from '@types';

interface StoreTableProps {
    games?: Array<Game>;
}

const StoreTable: React.FC<StoreTableProps> = ({ games }) => {
    return (
        <>
            {games && (
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Title</th>
                        <th scope="col">Categories</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Price</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {games.map((game, index) => (
                        <tr key={index}>
                            <td>
                                <img
                                    src={game.image}
                                    alt={game.title}
                                    style={{ width: '150px', height: 'auto' }}
                                />
                            </td>
                            <td>{game.title}</td>
                            <td>{game.categories.join(', ')}</td>
                            <td>{game.discount}%</td>
                            <td>€{game.price.toFixed(2)}</td>
                            <td><a>PURCHASE</a></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default StoreTable;
