// props
import { MoviesProps } from "../interfaces/props";
// API key
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const getBannerContent = async (arr: MoviesProps[]) => {
    try {
        const resposne = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&page=${Math.floor(Math.random() * 5) + 1}`);
        const data = await resposne.json();

        const cleanedArr: MoviesProps[] = cleanMovieDetails((data.results), arr);
        return cleanedArr;
    } catch (error) {
        console.log(`Error (Banner Content) - ${error}`);
    }
}

// trending movies
export const getTrendingMovies = async (arr: MoviesProps[]) => {
    try {
        const resposne = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
        const data = await resposne.json();

        const cleanedArr: MoviesProps[] = cleanMovieDetails((data.results), arr);
        return cleanedArr;
    } catch (error) {
        console.log(`Error (Trending Movies) - ${error}`);
    }
}

// top rated movies
export const getTopRatedMovies = async (arr: MoviesProps[]) => {
    try {
        const resposne = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${Math.floor(Math.random() * 10) + 1}`);
        const data = await resposne.json();

        const cleanedArr: MoviesProps[] = cleanMovieDetails((data.results), arr);
        return cleanedArr;
    } catch (error) {
        console.log(`Error (Top Rated Movies) - ${error}`);
    }
}

// upcomming movies
export const getUpcommingMovies = async (arr: MoviesProps[]) => {
    try {
        const resposne = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`);
        const data = await resposne.json();

        const cleanedArr: MoviesProps[] = cleanMovieDetails((data.results), arr);
        return cleanedArr
    } catch (error) {
        console.log(`Error - Upcomming Movies - ${error}`)
    }
}

// discover movies by genre
export const getMoviesByGenre = async (arr: MoviesProps[], genreId: string) => {
    try {
        const resposne = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${Math.floor(Math.random() * 20) + 1}`);
        const data = await resposne.json();

        const cleanedArr: MoviesProps[] = cleanMovieDetails((data.results), arr);
        return cleanedArr
    } catch (error) {
        console.log(`Error - ${genreId} Movies - ${error}`)
    }
}

// discover tv shows by genre
export const getTvShowsByGenre = async (arr: MoviesProps[], genreId: string) => {
    try {
        const resposne = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${genreId}&page=${Math.floor(Math.random() * 10) + 1}`);
        const data = await resposne.json();

        const cleanedArr: MoviesProps[] = cleanMovieDetails((data.results), arr);
        return cleanedArr
    } catch (error) {
        console.log(`Error - ${genreId} Movies - ${error}`)
    }
}

// related movies
export const getRelatedMovies = async (arr: MoviesProps[], movieId: number) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`)
        const data = await response.json();

        const cleanedArr: MoviesProps[] = cleanMovieDetails((data.results), arr);
        return cleanedArr;
    } catch (error) {
        console.log(`Error - Related Movies - ${error}`)
    }
}

export const getRelatedTVShows = async (arr: MoviesProps[], tvId: number) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/similar?api_key=${API_KEY}`)
        const data = await response.json();

        const cleanedArr: MoviesProps[] = cleanMovieDetails((data.results), arr);
        return cleanedArr;
    } catch (error) {
        console.log(`Error - Related Movies - ${error}`)
    }
}

// search movies
export const getSearchResults = async (query: string, type: string, arr: MoviesProps[]) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/${type}?query=${query}&api_key=${API_KEY}`)
        const data = await response.json();

        const cleanedArr: MoviesProps[] = cleanMovieDetails((data.results), arr)
        return cleanedArr;
    } catch (error) {
        console.log(`Error - Search Reaults Movies - ${error}`)
    }
}

// get movies by provider
export const getMoviesByProvider = async (arr: MoviesProps[], providerId: string) => {
    try {
        const resposne = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_watch_providers=${providerId}&watch_region=US&sort_by=popularity.desc&page=${Math.floor(Math.random() * 20) + 1}`);
        const data = await resposne.json();

        const cleanedArr: MoviesProps[] = cleanMovieDetails((data.results), arr);
        return cleanedArr
    } catch (error) {
        console.log(`Error - ${providerId} Movies - ${error}`)
    }
}

// get tv shows by provider
export const getTvShowsByProvider = async (arr: MoviesProps[], providerId: string) => {
    try {
        const resposne = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_watch_providers=${providerId}&watch_region=US&sort_by=popularity.desc&page=${Math.floor(Math.random() * 15) + 1}`);
        const data = await resposne.json();

        const cleanedArr: MoviesProps[] = cleanMovieDetails((data.results), arr);
        return cleanedArr
    } catch (error) {
        console.log(`Error - ${providerId} Movies - ${error}`)
    }
}

const cleanMovieDetails = (data: any[], arr: MoviesProps[],) => {
    data.map((item: any) => {
        arr.push({
            title: item.original_title,
            backdrop_path: 'https://image.tmdb.org/t/p/original/' + item.backdrop_path,
            id: item.id,
            original_language: item.original_language,
            popularity: item.popularity,
            poster_path: item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}`: `https://i.ibb.co/YTdfZHjX/no-preview.jpg`,
            overview: item.overview,
            release_date: item.release_date,
            vote_average: item.vote_average,
            original_name: item.original_name ? item.original_name : null,
            first_air_date: item.first_air_date ? item.first_air_date : null
        })
    });

    return arr;
}