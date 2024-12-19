import React from 'react';
import Image from "next/image";
import { useRouter } from 'next/router';

interface BadgeImageProps {
  badgeName: string;
  owned: boolean
}

const BadgeImage: React.FC<BadgeImageProps> = ({badgeName, owned}) => {
    const badgeToImageSource = () => {
        const badgeNameTrimmed = badgeName.split(" ").join("");
        let source = "/placeholder"
        if (owned) {
            source = "/images/badges/" + badgeNameTrimmed + ".png"
        } else {
            source = "/images/badges/" + badgeNameTrimmed + "-grey.png"
        }
        return source
    }

    return (
        <img src={badgeToImageSource()} 
            width={256}/>
    )
}

export default BadgeImage