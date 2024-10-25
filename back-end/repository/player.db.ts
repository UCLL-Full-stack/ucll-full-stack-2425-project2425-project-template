import { Player } from "../model/player";
import { PlayerInput } from "../types/types";

let currentId = 1;

const players: Player[] = [
    new Player({id: currentId++, name: 'Cristiano Ronaldo', position: 'Forward', birthdate: new Date('1985-02-05')}),
    new Player({id: currentId++, name: 'Lionel Messi', position: 'Forward', birthdate: new Date('1987-06-24')}),
    new Player({id: currentId++, name: 'Neymar Jr', position: 'Forward', birthdate: new Date('1992-02-05')}),
    new Player({id: currentId++, name: 'Nicolas Jackson', position: 'Forward', birthdate: new Date('1998-12-20')}),
]

const findAll = async (): Promise<Player[]> => {
    return players;
}

const findById = async (id: number): Promise<Player | undefined> => {
    return players.find(player => player.getId() === id);
}

const addPlayer = async ({name, position, birthdate}: PlayerInput): Promise<Player> => {
    const player = new Player({id: currentId++, name, position, birthdate});
    players.push(player);
    return player;
    
}

export default {findAll, findById, addPlayer};


