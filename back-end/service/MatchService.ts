import { Match } from "../model/Match";
import { MatchInput } from "../types";

const createMatch = async ({
    matchId,
    date,
    hall,
    square,
    players
}: MatchInput): Promise<Match> => {
    const match = new Match ({
        matchId,
        date,
        hall,
        square,
        players
    })
    return match;
}

export default {
    createMatch,
}