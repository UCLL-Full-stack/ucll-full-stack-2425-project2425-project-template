import { Match } from "../model/match";
import { MatchInput } from "../types";

const matches: Match[] = [];


const getAllMatches = (): Match[] => { return matches; };
    

const getMatchById = (matchId: number): Match | undefined => {
    return matches.find(match => match.getId() === matchId);
};

const addMatch = (match: Match): Match => {
    matches.push(match);
    return match;
};

export default { getMatchById, addMatch, getAllMatches };
