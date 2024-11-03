export type Duration = {
    hours : number,
    minutes: number,
    seconds: number
}

export type Artist= {
    id?: number,
    name: string,
    bio: string,
    albums: Album[] 
}

export type Song = {
    id?: number,
    title: string,
    duration: Duration,
    album: Album,
    artists: Artist
}

export type Album = {
    id?: number,
    title: string,
    duration: Duration,
    artists: Artist[],
    songs: Song[],
    releaseDate: Date 
}

export type ListInput = {
    title: string,
    description: string,
    albums: number[]
}

export type List = {
    id?: number,
    createdAt: number,
    title: string,
    description: string,
    albums: Album[]
}
