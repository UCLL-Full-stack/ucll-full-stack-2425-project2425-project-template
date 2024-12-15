export type Artist= {
    id?: number,
    name: string,
    bio: string,
    albums: Album[] 
}

export type Album = {
    id: string,
    name: string,
    artist: string,
    image: {"#text": string, size: string}[],
}

export type Track= {
    id?: number,
    title: string,
    duration: Duration,
    album: Album,
    artists: Artist
}

export type ArtistResponse = {
    results: {
        artistmatches:{
            artist: Artist[];
        }
    }
}

export type AlbumResponse = {
    results: {
        albummatches:{
            album: Album[];
        }
    }
}

export type TrackResponse = {
    results: {
        trackmatches:{
            track: Track[];
        }
    }
}

export type UserInput = {
    username?: string,
    email: string,
    password: string
}

export type ListInput = {
    authorId: number,
    title: string,
    description: string,
    albums: string[]
}

export type ReviewInput = {
    authorId: number,
    title: string,
    body: string,
    albumId: string,
    starRating: number
}

export type CommentInput = {
    authorId: number,
    body: string,
    reviewId: Review,
}

export type User = {
    id: number,
    createdAt: Date,
    email: string,
    password: string,
    username: string,
    lists: List[],
    reviews: Review[]
}

export type List = {
    id: number,
    author: User,
    createdAt: number,
    title: string,
    description: string,
    albumIds: string[]
}

export type Review = {
    id: number,
    author: User,
    createdAt: number,
    title: string,
    body: string,
    albumId: string,
    likeCount: number,
    starRating: number,
    comments: Comment[]
}

export type Comment = {
    id: number,
    author: User, 
    createdAt: number,
    body: string,
    reviewId: number
}

export type JWTobject = {
    token: string,
    email: string,
    id: string
}
