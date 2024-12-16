import { PrismaClient } from '@prisma/client';
import { PlayerInput, Role } from '../types';
import Player from '../model/player';
import { User } from '../model/user';
import Team from '../model/team';

const prisma = new PrismaClient();

const getAllPlayers = async (): Promise<Player[]> => {
    const playersPrisma = await prisma.player.findMany({
        include: {
            user: true,
            team: true,
        },
    });

    return playersPrisma.map(playerPrisma => 
        Player.from(playerPrisma, new User({ ...playerPrisma.user, role: playerPrisma.user.role as Role }), new Team(playerPrisma.team))
    );
};

const addPlayer = async (playerInput: PlayerInput): Promise<Player> => {
    const { number, user, team } = playerInput;
    const playerPrisma = await prisma.player.create({
        data: {
            number,
            user: { connect: { id: user.id } },
            team: { connect: { id: team.id } },
        },
        include: {
            user: true,
            team: true,
        },
    });

    return Player.from(playerPrisma, new User({ ...playerPrisma.user, role: playerPrisma.user.role as Role }), new Team(playerPrisma.team));
};

export default {
    getAllPlayers,
    addPlayer,
};