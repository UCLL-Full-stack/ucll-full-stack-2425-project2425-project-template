import {
    Build as BuildPrisma ,
    Part as PartPrisma,
} from "@prisma/client";
import { Part } from "./part";

export class Build {
    private id?: number;
    private parts: Part[];
    private price: number;
    private preBuild: boolean;

    constructor(build: {
        id?: number;
        parts: Part[];
        price: number;
        preBuild: boolean;
    }) {
        this.validate(build)

        this.id = build.id;
        this.parts = build.parts;
        this.price = build.price;
        this.preBuild = build.preBuild;
    }

    validate(build: {
        id?: number;
        parts: Part[];
        price: number;
        preBuild: boolean;
    }) {
        if (build.parts.length == 0) {
            throw new Error('Build must have parts');
        }
        if (build.price <= 0) {
            throw new Error('Build must have positive and non zero price')
        }
    }

    static from ({
        id,
        price,
        preBuild,
        parts
    }: BuildPrisma & { parts: PartPrisma[] }): Build {
        return new Build({
            id,
            price,
            preBuild,
            parts: parts.map((part) => Part.from(part)),
        })
    }

    getId(): number | undefined {
        return this.id;
    }

    getParts(): Part[] {
        return this.parts;
    }

    getPrice(): number {
        return this.price;
    }

    getPreBuild(): boolean {
        return this.preBuild;
    }

}