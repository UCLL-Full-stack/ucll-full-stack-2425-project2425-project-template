import React from 'react';
import 'tailwindcss/tailwind.css';

const Test: React.FC = () => {
    return (
        <div
        className="w-8 h-8"
        style={{
            backgroundImage: `url(/images/floor.png)`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }} />
    
    )
};

export default Test;