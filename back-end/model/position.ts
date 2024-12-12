import { Position as PositionPrisma, Player as PlayerPrisma} from '@prisma/client';
import { Player } from './player';

export class Position {
    private id?: number;
    private x: number;
    private y: number;
    private type: string;
    private active: boolean;
    private player?: Player;

    constructor(position: { id?: number; player?: Player; x: number; y: number, type: string, active: boolean }) {
        this.id = position.id;
        this.player = position.player;
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

    getPlayer(): Player | undefined {
        return this.player;
    }

    static from({ id, x, y, type, active }: PositionPrisma) {
        return new Position({
            id,
            x,
            y,
            type,
            active
        });
    }
}