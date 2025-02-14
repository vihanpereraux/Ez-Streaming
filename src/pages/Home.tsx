import React, { useEffect, useState } from "react";

// MUI
import { Typography, Box } from "@mui/material";

// components
import MovieCarousel from "../components/MovieCarousel";

// props
import { MoviesProps } from "../interfaces/props";


const trendingMoviesLocalArr: MoviesProps[] = [];
const topRatedMoviesLocalArr: MoviesProps[] = [];
const Home: React.FC = () => {
    const [trendingMovies, SetTrendingMovies] = useState<MoviesProps[]>(trendingMoviesLocalArr);
    const [topRatedMovies, SetTopRatedMovies] = useState<MoviesProps[]>(topRatedMoviesLocalArr);

    useEffect(() => {
        const getTrendingMovies = async () => {
            const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
            const resposne = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
            const data = await resposne.json();
            // console.log(data.results);

            (data.results).map((item: any) => {
                trendingMoviesLocalArr.push({
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
            SetTrendingMovies([...trendingMoviesLocalArr])
        }


        const getTopRatedMovies = async () => {
            const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
            const resposne = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`);
            const data = await resposne.json();
            // console.log(data.results);

            (data.results).map((item: any) => {
                topRatedMoviesLocalArr.push({
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
            SetTopRatedMovies([...topRatedMoviesLocalArr])
        }

        getTrendingMovies();
        getTopRatedMovies();
    }, [])

    return (
        <>
            {/* carosuel - trnding movies */}
            <Box sx={{ mt: 2.5 }}>
                <MovieCarousel
                    title="Trending Movies"
                    trendingMovies={trendingMovies} />
            </Box>

            {/* carosuel - trnding movies */}
            <Box sx={{ mt: 2.5 }}>
                <MovieCarousel
                    title="Top Rated Movies"
                    trendingMovies={topRatedMovies} />
            </Box>
        </>
    )
}

export default Home;