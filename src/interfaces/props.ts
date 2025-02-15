export interface NavItemProps {
    navItem: string,
    path: string
}

export interface MoviesProps {
    title: string,
    backdrop_path: string,
    id: number,
    original_language: string,
    popularity: number,
    poster_path: string,
    overview: string,
    release_date: string,
    vote_average: number
}

export interface CarosuelCardProps {
    poster_path: string,
    title: string,
    release_date: string,
    vote_average: number
}