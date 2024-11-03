import Link from 'next/link';
import React from 'react';

enum ButtonType {
    Home = 'home',
    Login = 'login',
}

enum ButtonStatus {
    Active = 'active',
    Inactive = 'inactive',
    CurrentPage = 'currentPage',
}
interface HeaderButtonProps {
    buttonType: ButtonType;
    buttonStatus: ButtonStatus;
}

const sharedClassOptions = 'shadow-button p-1';

    const typeOptions = {
        home: {
            text: 'Home',
            class: 'mr-3',
            href: '/',
        },
        login: {
            text: 'Log in',
            class: '',
            href: '/login',
        },
    };

    const statusOptions = {
        active: {
            class: 'bg-danger hover:shadow-success',
            attributes: {},
        },
        inactive: {
            class: 'shadow-button_pressed bg-secondary pointer-events-none',
            attributes: {
                disabled: true,
                tabIndex: -1,
                "aria-disabled": true,
            },
        },
        currentPage: {
            class: 'shadow-button_pressed bg-success pointer-events-none',
            attributes: {
                disabled: true,
                tabIndex: -1,
                "aria-disabled": true,                
            },
        },
    };

const HeaderButton: React.FC<HeaderButtonProps> = ({ buttonType, buttonStatus }) => {
    const buttonClass = `${sharedClassOptions} ${statusOptions[buttonStatus].class} ${typeOptions[buttonType].class}`;
    const buttonAttributes = statusOptions[buttonStatus].attributes;
    const buttonHref = typeOptions[buttonType].href;

    return (
        <Link href={buttonHref} className={buttonClass} {...buttonAttributes}>
            {typeOptions[buttonType].text}
        </Link>
    );
};

export {
    HeaderButton,
    ButtonType,
    ButtonStatus,
};