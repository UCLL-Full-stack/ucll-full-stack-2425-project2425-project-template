import React from 'react';
import { Game } from '@types';
import { right } from '@popperjs/core';

type Props = {
    games: Array<Game>;
};

const LibraryTable: React.FC<Props> = ({ games }: Props) => {
    return (
        <>
            {games && (
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Categories</th>
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
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default LibraryTable;
