import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
// MUI
import { Box, Typography } from "@mui/material";

// components
import MovieCarousel from "../components/MovieCarousel";

// services
import { getRelatedMovies } from "../services/Api";

// props
import {
    MoviesProps,
} from "../interfaces/props";

const MovieScreen: React.FC = () => {
    const [movieDetails, setMovieDetails] = useState<any>({});
    const [relatedContent, setRelatedContent] = useState<MoviesProps[]>([])

    // movie props (nav)
    const location = useLocation();
    const params: any = new URLSearchParams(location.search);

    const relatedMoviesLocalArr: MoviesProps[] = []
    const getRelatedContent = async () => {
        const content = await getRelatedMovies(relatedMoviesLocalArr, params.get("id"));
        if (content) { setRelatedContent([...content]); }
    }

    const getMovieDetails = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${params.get("id")}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
        const data = await response.json();
        console.log(data)
        setMovieDetails({ ...data });
        if (movieDetails) {
            getRelatedContent();
        }
    }

    useEffect(() => {
        getMovieDetails();
    }, [params.get("id")])


    return (
        <>
            <Box sx={{ pt: 15, pl: 6, pr: 6 }}>
                <Box sx={{ display: "flex" }}>
                    <Box sx={{ width: '60%' }}>
                        <iframe
                            allowFullScreen={true}
                            style={{
                                width: '100%',
                                aspectRatio: '16/9',
                                border: 'none',
                                borderRadius: 12,
                            }}
                            src={`https://vidsrc.xyz/embed/movie/${params.get("id")}`}>
                        </iframe>
                    </Box>
                    {/* details */}
                    <Box sx={{ width: '40%', pl: 3.5 }}>
                        <Typography
                            sx={{
                                color: 'white',
                                textAlign: 'left',
                                fontSize: 25,
                                fontFamily: 'Rubik',
                                fontWeight: 450,
                                mb: 1
                            }}>{movieDetails.original_title}</Typography>

                        {/* other details */}
                        <span style={{
                            color: 'white',
                            fontSize: 16,
                        }}>
                            {movieDetails.release_date ? movieDetails.release_date.slice(0, 4) : '...'} &nbsp;&nbsp;
                            <FaStar style={{ color: 'orange' }} /> &nbsp;{Math.round(movieDetails.vote_average * 10) / 10}</span>

                        <Typography
                            sx={{
                                fontFamily: 'Rubik',
                                fontSize: 16,
                                lineHeight: 1.6,
                                fontWeight: 400,
                                mt: 3,
                                color: 'white'
                            }}>{movieDetails.overview}</Typography>
                    </Box>
                </Box>

                {/* related content */}
                <Box sx={{ mt: 8 }}>
                    {relatedContent.length > 0 ? (
                        <MovieCarousel
                            type="movie"
                            title="Movies You May Love : )"
                            content={relatedContent} />
                    ) : (
                        <Typography
                            sx={{
                                fontWeight: 450,
                                fontFamily: 'Rubik',
                                color: 'white',
                                fontSize: 22,
                                mt: 8
                            }}>
                            No related movies found &nbsp; : (</Typography>
                    )}

                </Box>
            </Box>
        </>
    )
}

export default MovieScreen;