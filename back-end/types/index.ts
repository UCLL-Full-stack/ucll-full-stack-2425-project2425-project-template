import { Coach } from "../model/coach";
import { Player } from "../model/player";
import { Team } from "../model/team";

type Role = 'coach' | 'player';

type PlayerInput = {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
};

type CoachInput = {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
};

type TeamInput = {
    id?: number;
    teamName: string;
    players: Player[];
    coach: Coach;   
};

type GameInput = {
    id?: number;
    date: Date;
    result?: string;
    teams: Team[];
};

export { Role, PlayerInput, CoachInput, TeamInput, GameInput };
