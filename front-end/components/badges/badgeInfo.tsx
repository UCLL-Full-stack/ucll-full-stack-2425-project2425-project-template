import React from 'react';
import Image from "next/image";
import { useRouter } from 'next/router';
import { Badge } from '@types';
import BadgeImage from './badgeImage';

interface BadgeInfoProps {
  badge: Badge
  owned: boolean
  handleAddBadge: (badge:Badge)=>void
}

const BadgeInfo: React.FC<BadgeInfoProps> = ({badge, owned, handleAddBadge}) => {
    return (
        <div>
            <BadgeImage
            badgeName={badge.name}
            owned={true}/>
            <p>{badge.name}</p>
            <p>It can be gotten at {badge.location}</p>
            <p>It has a difficulty of {badge.difficulty}/5</p>
            {!owned && badge && (
                <button onClick={()=>handleAddBadge(badge)}>
                    add
                </button>)}
            {owned && (
                <p>Congrats on getting this badge!</p>
            )}
        </div>)
}

export default BadgeInfo
