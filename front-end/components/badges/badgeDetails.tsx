import React from 'react';
import { Badge } from '@types';
import Image from "next/image";

interface BadgeDetailsProps {
  badges: Badge[];
}

const BadgeDetails: React.FC<BadgeDetailsProps> = ({ badges }) => {
    const badgeToImageSource = (badgeName:String) => {
        const badgeNameTrimmed = badgeName.split(" ").join("");
        const source = "/images/badges/" + badgeNameTrimmed + ".png"
        return source
    }

  return (
    <div className="flex flex-wrap flex-row justify-center items-center gap-4">
      {badges.map((badge) => (
        <div>
            <img src={badgeToImageSource(badge.name)} 
            width={256}/>
            <p>{badge.name}</p>
        </div>
      ))}
    </div>
  );
};

export default BadgeDetails;