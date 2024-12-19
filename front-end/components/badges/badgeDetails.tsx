import React from 'react';
import { Badge } from '@types';
import Image from "next/image";
import { useRouter } from 'next/router';

interface BadgeDetailsProps {
  badges: Badge[];
}

const BadgeDetails: React.FC<BadgeDetailsProps> = ({ badges }) => {
    const router = useRouter();
    
    const badgeToImageSource = (badgeName:String) => {
        const badgeNameTrimmed = badgeName.split(" ").join("");
        const source = "/images/badges/" + badgeNameTrimmed + ".png"
        return source
    }

    const goToBadgeInfo = (badgeName:string) => {
      router.push('/badges/'+badgeName)
    }

  return (
    <div className="flex flex-wrap flex-row justify-center items-center gap-4">
      {badges.map((badge) => (
        <div onClick={()=>goToBadgeInfo(badge.name)}>
            <img src={badgeToImageSource(badge.name)} 
            width={256}/>
            <p>{badge.name}</p>
            <p>{badge.difficulty}</p>
        </div>
      ))}
    </div>
  );
};

export default BadgeDetails;