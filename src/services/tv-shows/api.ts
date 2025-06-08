// props
import { MoviesProps } from "../../interfaces/props";

// API key
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const getTvShowsByGenre = async (arr: MoviesProps[], id: string) => {
    try {
        const resposne = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${id}&sort_by=popularity.desc&vote_average.gte=7.5&page=${Math.floor(Math.random() * 8) + 1}`);
        const data = await resposne.json();

        const cleanedArr: MoviesProps[] = cleanTvDetails((data.results), arr);
        return cleanedArr
    } catch (error) {
        console.error(`Error fetching content - ${error}`)
    }
}

const cleanTvDetails = (data: any[], arr: MoviesProps[],) => {
    data.map((item: any) => {
        arr.push({
            title: item.original_title,
            backdrop_path: 'https://image.tmdb.org/t/p/original/' + item.backdrop_path,
            id: item.id,
            original_language: item.original_language,
            popularity: item.popularity,
            poster_path: item.poster_path ? `https://image.tmdb.org/t/p/original/${item.backdrop_path}` : `https://i.ibb.co/YTdfZHjX/no-preview.jpg`,
            overview: item.overview,
            release_date: item.release_date,
            vote_average: item.vote_average,
            original_name: item.original_name ? item.original_name : null,
            first_air_date: item.first_air_date ? item.first_air_date : null
        })
    });

    return arr;
}