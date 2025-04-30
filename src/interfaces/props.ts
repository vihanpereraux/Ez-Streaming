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
    original_name: string,
    first_air_date: string
}

export interface CarosuelCardProps {
    poster_path: string,
    title: string,
    release_date: string,
    vote_average: number,
    type: string,
    overview: string,
    id: number,
    first_air_date: string
    original_name: string
}

export interface BannerCardProps {
    poster_path: string,
    original_name: string,
    first_air_date: string,
    vote_average: number,
    type: string,
    overview: string,
    id: number,
}

export interface SearchCardProps {
    poster_path: string,
    title: string,
    release_date: string,
    vote_average: number,
    type: string,
    overview: string,
    id: number,
    first_air_date: string
    original_name: string
}

export interface ScreenNavigationProps {
    title: string,
    release_date: string,
    vote_average: number,
    overview: string,
    id: number,
    first_air_date: string
}

export interface ReviewDataProps {
    authorUsername: string,
    review: string,
    date: string
}

export interface SeasonProps {
    season: number,
    numOfEpisodes: number,
    names: string[],
    image: string[]
}

