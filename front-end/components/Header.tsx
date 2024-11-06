import React from 'react';

interface HeaderProps {
    onCreateClick: () => void;
    onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateClick, onLoginClick }) => {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <h1 className="text-2xl font-bold">KanbanCord</h1>
            {/* Login button */}
            <button onClick={onLoginClick} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Login
            </button>
            <button
                onClick={onCreateClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Create
            </button>
        </header>
    );
};

export default Header;
