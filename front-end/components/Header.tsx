import { useUser } from '@/context/UserContext';
import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './common/LanguageSwitcher';

interface HeaderProps {
    onCreateClick: () => void;
    onLoginClick: () => void;
    onBackToDashboard?: () => void;
    boardTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ onCreateClick, onLoginClick, onBackToDashboard, boardTitle }) => {
    const { user, setUser } = useUser();
    const [dropDownVisible, setDropDownVisible] = React.useState(false);
    const { t } = useTranslation(['common']);

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('guilds');
        setUser(null);
        window.location.reload();
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    const handleDiscordRefresh = () => {
        const redirectUri = `http://localhost:8080/api/auth/discord`;
        window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify guilds`;
    };        

    return (
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className='flex items-center' onClick={handleRefresh}>
                <img src="/images/kanbancord.png" alt="KanbanCord" className="w-12 h-12 mr-2" />
                <h1 className="text-2xl font-bold">KanbanCord</h1>
                {boardTitle && (
                    <span className="text-lg font-medium text-gray-300 ml-4">
                        {boardTitle}
                    </span>
                )}
            </div>
            <div className="flex items-center">
                <LanguageSwitcher />
                {onBackToDashboard && (
                    <button
                        onClick={onBackToDashboard}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {t("actions.back")}
                    </button>
                )}
                {user ? (
                    <div className='relative'>
                        <div className='flex items-center'>
                            {!boardTitle && (
                                <button
                                    onClick={onCreateClick}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    {t('actions.create')}
                                </button>
                            )}
                            <img
                                src={user.userAvatar}
                                alt={`${user.username}'s avatar`}
                                className="w-10 h-10 rounded-full ml-3"
                                onClick={() => setDropDownVisible(!dropDownVisible)}
                            />
                        </div>
                        {dropDownVisible && (
                            <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg py-2 z-20">
                                <button
                                    onClick={handleDiscordRefresh}
                                    className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                                >
                                    {t('actions.refresh')}
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                                >
                                    {t('header.logout')}
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={onLoginClick}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {t('header.login')}
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
