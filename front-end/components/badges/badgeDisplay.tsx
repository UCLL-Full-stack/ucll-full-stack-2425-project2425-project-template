import React, { useEffect, useState } from 'react';
import { Badge } from '@types';
import { useRouter } from 'next/router';
import BadgeImage from './badgeImage';

interface BadgeDisplayProps {
  badges: Badge[];
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ badges}) => {
    const router = useRouter();
    const [unownedBadges, setUnownedBadges] = useState<Badge[]>([])
    const allBadges = [
      {name:"Boulder badge", difficulty:1, location: "Pewter City"},
      {name:"Cascade badge", difficulty:1, location: "Cerulean City"},
      {name:"Thunder badge", difficulty:2, location: "Vermilion City"},
      {name:"Rainbow badge", difficulty:2, location: "Celadon City"},
      {name:"Soul badge", difficulty:3, location: "Fuchsia City"},
      {name:"Marsh badge", difficulty:4, location: "Saffron City"},
      {name:"Volcano badge", difficulty:5, location: "Seafoam Islands"},
      {name:"Earth badge", difficulty:5, location: "Viridian City"},
    ]

    useEffect(() => {
      const allBadgesFilterd = allBadges.filter((badge)=>!badges.map(ownedBadge=>ownedBadge.name).includes(badge.name));
      setUnownedBadges(allBadgesFilterd)
      }, []);

    const goToBadgeInfo = (badgeName:string, owned:boolean) => {
      router.push('/badges/' + badgeName +'/' + owned)
    }

  return (
    <div className="flex flex-row flex-wrap justify-start items-center gap-4"
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '16px',
    }}>
      {badges.map((badge) => (
        <div
          className="flex flex-col items-center"
          onClick={()=>goToBadgeInfo(badge.name,true)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            flexBasis: 'calc(20% - 16px)',
            maxWidth: 'calc(20% - 16px)',
            boxSizing: 'border-box',
          }}>
            <BadgeImage badgeName={badge.name} owned={true}/>
            <p>{badge.name}</p>
            <p>{badge.difficulty}</p>
        </div>
      ))}
      {unownedBadges.map((badge) => (
        <div onClick={()=>goToBadgeInfo(badge.name,false)}
        className="flex flex-col items-center"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          flexBasis: 'calc(20% - 16px)',
          maxWidth: 'calc(20% - 16px)',
          boxSizing: 'border-box',
        }}>
            <BadgeImage badgeName={badge.name} owned={false}/>
            <p>{badge.name}</p>
            <p>{badge.difficulty}</p>
        </div>
      ))}
    </div>
  );
};

export default BadgeDisplay;