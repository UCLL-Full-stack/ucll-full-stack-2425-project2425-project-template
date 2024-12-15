import { Position as PositionPrisma, Player as PlayerPrisma, User as UserPrisma} from '@prisma/client';
import { Player } from './player';

export class Position {
    private id?: number;
    private x: number;
    private y: number;
    private type: string;
    private active: boolean;
    private playerID?: number | null;

    constructor(position: { id?: number; playerID?: number | null; x: number; y: number, type: string, active: boolean }) {
        this.id = position.id;
        this.playerID = position.playerID;
        this.x = position.x;
        this.y = position.y;
        this.type = position.type;
        this.active = position.active;
    }

    getId(): number | undefined {
        return this.id;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    getType(): string {
        return this.type;
    }

    getActive(): boolean {
        return this.active;
    }

    getPlayer(): number | undefined | null {
        return this.playerID;
    }

    static from({ id, x, y, type, active, playerId }: PositionPrisma) {
        return new Position({
            id,
            x,
            y,
            type,
            active,
            playerID: playerId,
        });
    }
}