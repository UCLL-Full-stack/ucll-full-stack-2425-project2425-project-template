import {Rol} from "../types";
import { Groep } from "./groep";
import { 
    Leiding as LeidingPrisma,
    Groep as GroepPrisma,
    Nieuwsbericht as NieuwsberichtPrisma
} from "@prisma/client";
import { Nieuwsbericht } from "./nieuwsbericht";
import { th } from "date-fns/locale";

export class Leiding{
    private id: number;
    private naam: string;
    private voornaam: string;
    private email: string;
    private telefoon: string;
    private rol: Rol;
    private totem: string;
    private nieuwsbericht: Nieuwsbericht[];
    private wachtwoord: string;
    private groepId: number;

    constructor(leiding:{
        id: number,
        naam: string,
        voornaam: string,
        email: string,
        telefoon: string,
        rol: Rol,
        totem: string,
        nieuwsberichten: Nieuwsbericht[],
        wachtwoord: string
        groepId: number
    }) {
        this.id = leiding.id;
        this.naam = leiding.naam;
        this.voornaam = leiding.voornaam;
        this.email = leiding.email;
        this.telefoon = leiding.telefoon;
        this.rol = leiding.rol;
        this.totem = leiding.totem;
        this.nieuwsbericht = leiding.nieuwsberichten;
        this.wachtwoord = leiding.wachtwoord;
        this.groepId = leiding.groepId;
    }

    public getId(): number {
        return this.id;
    }

    public getNaam(): string {
        return this.naam;
    }

    public getVoornaam(): string {
        return this.voornaam;
    }

    public getEmail(): string {
        return this.email;
    }

    public getTelefoon(): string {
        return this.telefoon;
    }

    public getRol(): Rol {
        return this.rol;
    }

    public getTotem(): string {
        return this.totem;
    }

    public getNieuwsberichten(): Nieuwsbericht[] {
        return this.nieuwsbericht ?? [];
    }

    public getWachtwoord(): string {
        return this.wachtwoord;
    }

    public getGroepId(): number {
        return this.groepId;
    }

    public setNaam(naam: string): void {
        this.naam = naam;
    }

    public setVoornaam(voornaam: string): void {
        this.voornaam = voornaam;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setTelefoon(telefoon: string): void {
        this.telefoon = telefoon;
    }

    public setRol(rol: Rol): void {
        this.rol = rol;
    }

    public setTotem(totem: string): void {
        this.totem = totem;
    }

    public setGroepId(groepId: number): void {
        this.groepId = groepId;
    }

    public addNieuwsbericht(nieuwsbericht: Nieuwsbericht): void {
        this.nieuwsbericht?.push(nieuwsbericht);
    }

    public removeNieuwsbericht(nieuwsbericht: Nieuwsbericht): void {
        this.nieuwsbericht = this.nieuwsbericht?.filter(n => n.equals(nieuwsbericht));
    }

    static from({
        id,
        naam,
        voornaam,
        email,
        telefoon,
        rol,
        totem,
        nieuwsberichten,
        wachtwoord,
        groepId
    }: LeidingPrisma  & {
        nieuwsberichten: NieuwsberichtPrisma[];
    }): Leiding {
        return new Leiding({
            id,
            naam,
            voornaam,
            email,
            telefoon,
            rol: rol as Rol,
            totem,
            nieuwsberichten: nieuwsberichten.map((nieuwsbericht) => Nieuwsbericht.from({ ...nieuwsbericht, auteurId: nieuwsbericht.leidingId })),
            wachtwoord,
            groepId
        });
    }

    public toPlainObject(): {
        id: number;
        naam: string;
        voornaam: string;
        email: string;
        wachtwoord: string;
        telefoon: string;
        rol: string;
        totem: string;
        groepId: number;
    } {
        return {
            id: this.id,
            naam: this.naam,
            voornaam: this.voornaam,
            email: this.email,
            wachtwoord: this.wachtwoord,
            telefoon: this.telefoon,
            rol: this.rol,
            totem: this.totem,
            groepId: this.groepId
        };
    }

    equals(leiding: any): boolean {
        if (leiding === null) {
            return false;
        } else if (leiding === undefined) {
            return false;
        } else if (leiding instanceof Leiding) {
            return this.naam === leiding.getNaam() && 
            this.voornaam === leiding.getVoornaam() && 
            this.email === leiding.getEmail() && 
            this.telefoon === leiding.getTelefoon() && 
            this.rol === leiding.getRol() &&
            this.totem === leiding.getTotem() 
        } else {
            return false;
        }
    }
}

export class PublicLeiding{
    private id: number;
    private naam: string;
    private voornaam: string;
    private email: string;
    private telefoon: string;
    private totem: string;
    private rol: Rol;
    private groep: string;

    constructor(leiding:{
        id: number,
        naam: string,
        voornaam: string,
        email: string,
        telefoon: string,
        totem: string,
        rol: Rol,
        groep: string
    }) {
        this.id = leiding.id;
        this.naam = leiding.naam;
        this.voornaam = leiding.voornaam;
        this.email = leiding.email;
        this.telefoon = leiding.telefoon;
        this.totem = leiding.totem;
        this.rol = leiding.rol;
        this.groep = leiding.groep;
    }

    public getId(): number {
        return this.id;
    }

    public getNaam(): string {
        return this.naam;
    }

    public getVoornaam(): string {
        return this.voornaam;
    }

    public getEmail(): string {
        return this.email;
    }

    public getTelefoon(): string {
        return this.telefoon;
    }

    public getTotem(): string {
        return this.totem;
    }

    public getRol(): Rol {
        return this.rol;
    }

    public getGroep(): string {
        return this.groep;
    }

    static from({
        leiding,
        groep
    }: {
        leiding: Leiding, groep: string;
    }): PublicLeiding {
        return new PublicLeiding({
            id: leiding.getId(),
            naam: leiding.getNaam(),
            voornaam: leiding.getVoornaam(),
            email: leiding.getEmail(),
            telefoon: leiding.getTelefoon(),
            totem: leiding.getTotem(),
            rol: leiding.getRol(),
            groep: groep
        });
    }
}