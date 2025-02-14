import React, {
    useEffect,
    useState
} from "react";

// MUI
import { Box } from "@mui/material";

// components
import MovieCarousel from "../components/MovieCarousel";

// props
import { MoviesProps } from "../interfaces/props";

// local arrays
const trendingMoviesLocalArr: MoviesProps[] = [];
const topRatedMoviesLocalArr: MoviesProps[] = [];
const upcommingMoviesLocalArr: MoviesProps[] = [];

const carouselSpacing: number = 8;

const Home: React.FC = () => {
    const [trendingMovies, setTrendingMovies] = useState<MoviesProps[]>(trendingMoviesLocalArr);
    const [topRatedMovies, setTopRatedMovies] = useState<MoviesProps[]>(topRatedMoviesLocalArr);
    const [upcommingMovies, setUpcommingMovies] = useState<MoviesProps[]>(upcommingMoviesLocalArr);

    const getTrendingMovies = async () => {
        try {
            const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
            const resposne = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
            const data = await resposne.json();

            const cleanedArr: MoviesProps[] = cleanMovieDetails((data.results), trendingMoviesLocalArr);
            setTrendingMovies([...cleanedArr]);
        } catch (error) {
            alert(`Error - Trending Movies - ${error}`)
        }
    }

    const getTopRatedMovies = async () => {
        try {
            const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
            const resposne = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`);
            const data = await resposne.json();

            const cleanedArr: MoviesProps[] = cleanMovieDetails((data.results), topRatedMoviesLocalArr);
            setTopRatedMovies([...cleanedArr]);
        } catch (error) {
            alert(`Error - Top Rated Movies - ${error}`)
        }
    }

    const getUpcommingMovies = async () => {
        try {
            const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
            const resposne = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`);
            const data = await resposne.json();

            const cleanedArr: MoviesProps[] = cleanMovieDetails((data.results), upcommingMoviesLocalArr);
            setUpcommingMovies([...cleanedArr]);
        } catch (error) {
            alert(`Error - Top Rated Movies - ${error}`)
        }
    }

    const cleanMovieDetails = (data: any[], arr: MoviesProps[],) => {
        data.map((item: any) => {
            arr.push({
                title: item.original_title,
                backdrop_path: item.backdrop_path,
                id: item.id,
                original_language: item.original_language,
                popularity: item.popularity,
                poster_path: 'https://image.tmdb.org/t/p/w500/' + item.poster_path,
                overview: item.overview,
                release_date: item.release_date,
                vote_average: item.vote_average
            })
        });

        return arr;
    }

    useEffect(() => {
        getTrendingMovies();
        getTopRatedMovies();
        getUpcommingMovies();
    }, [])

    return (
        <>
            <Box sx={{ pl: 6, pr: 6 }}>
                {/* carosuel - trending movies */}
                <Box sx={{ mt: carouselSpacing }}>
                    <MovieCarousel
                        title="Trending Movies"
                        trendingMovies={trendingMovies} />
                </Box>

                {/* carosuel - now playing movies */}
                <Box sx={{ mt: carouselSpacing }}>
                    <MovieCarousel
                        title="Now Playing Movies"
                        trendingMovies={upcommingMovies} />
                </Box>

                {/* carosuel - top rated movies  */}
                <Box sx={{ mt: carouselSpacing }}>
                    <MovieCarousel
                        title="Top Rated Movies"
                        trendingMovies={topRatedMovies} />
                </Box>
            </Box>
        </>
    )
}

export default Home;