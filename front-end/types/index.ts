export type Activiteit = {
    id: number;
    naam: string;
    beschrijving: string;
    begindatum: Date;
    einddatum: Date;
};

export type Groep = {
    id: number;
    naam: string;
    beschrijving: string;
    activiteiten: Activiteit[];
    leiding: Leiding[];
};

export type Leiding = {
    id: number;
    naam: string;
    voornaam: string;
    email: string;
    telefoon: string;
    hoofdleiding: boolean;
    totem: string;
    groep: string;
};

export type Nieuwsbericht = {
    id: number;
    titel: string;
    inhoud: string;
    datum: Date;
    auteur: string;
};

export type UserLogin = {
    totem: string;
    wachtwoord: string;
};

export type StatusMessage = {
    message: String;
    type: "error" | "success";
};
