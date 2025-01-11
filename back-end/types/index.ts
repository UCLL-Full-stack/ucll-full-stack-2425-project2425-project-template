type Rol = 'ADMIN' | 'HOOFDLEIDING' | 'LEIDING';

type AuthenticationResponse = {
    token: string;
    totem: string;
    rol: Rol;
    groep: string;
};

type Activiteit = {
    naam: string;
    beschrijving: string;
    begindatim: Date;
    einddatum: Date;
}

export {
    Rol,
    AuthenticationResponse
};