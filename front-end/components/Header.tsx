import React from 'react';

interface HeaderProps {
    onCreateClick: () => void;
    onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateClick, onLoginClick }) => {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className='flex items-center'>
                <img src="/images/kanbancord.png" alt="KanbanCord" className="w-12 h-12 mr-2" />
                <h1 className="text-2xl font-bold">KanbanCord</h1>
            </div>
            <div>
                <button onClick={onLoginClick} className='mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Login
                </button>
                <button
                    onClick={onCreateClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Create
                </button>
            </div>
        </header>
    );
};

export default Header;
