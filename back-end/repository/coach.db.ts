import { PrismaClient } from '@prisma/client';
import { CoachInput, Role } from '../types';
import Coach from '../model/coach';
import { User } from '../model/user';
import Team from '../model/team';
import { get } from 'http';

const prisma = new PrismaClient();

const getAllCoaches = async (): Promise<Coach[]> => {
    const coachesPrisma = await prisma.coach.findMany({
        include: {
            user: true,
            team: true,
        },
    });

    return coachesPrisma.map(coachPrisma => 
        Coach.from(coachPrisma, new User({ ...coachPrisma.user, role: coachPrisma.user.role as Role }), new Team(coachPrisma.team))
    );
};

export default {
    getAllCoaches,
};