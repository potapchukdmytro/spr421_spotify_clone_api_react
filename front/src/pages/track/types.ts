export interface Genre {
    id: string;
    name: string;
}

export interface Track {
    id: string;
    title: string;
    description: string;
    audioUrl: string;
    posterUrl: string;
    releaseDate: Date;
    genre: Genre;
}

export interface CreateTrack {
    title: string;
    description: string;
    releaseDate: string;
    genreId: string;
}