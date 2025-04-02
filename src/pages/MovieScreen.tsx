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
import { MoviesProps } from "../interfaces/props";

const MovieScreen: React.FC = () => {
    const [movieDetails, setMovieDetails] = useState<any>({});
    const [relatedContent, setRelatedContent] = useState<MoviesProps[]>([]);
    const location = useLocation();
    const movieId = new URLSearchParams(location.search).get("id");

    // get movie details
    const getMovieDetails = async () => {
        if (!movieId) return;

        setMovieDetails({});
        setRelatedContent([]);

        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
            );
            const data = await response.json();
            setMovieDetails(data);
            await getRelatedContent();
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    // get related movies
    const getRelatedContent = async () => {
        if (!movieId) return;

        const content = await getRelatedMovies([], Number(movieId));
        if (content) {
            setRelatedContent(content);
        }
    };

    useEffect(() => {
        getMovieDetails();
        return () => {
            setMovieDetails({});
            setRelatedContent([]);
        };
    }, [movieId]);

    return (
        <Box
            key={movieId}
            sx={{
                pt: 15,
                pl: { xs: 2, lg: 6 },
                pr: { xs: 2, lg: 6 }
            }}>
            <Box sx={{
                display: { xs: "block", lg: "block" }
            }}>
                <Box sx={{
                    width: { xs: "100%", lg: "100%" }
                }}>
                    {movieId && (
                        <iframe
                            key={movieId}
                            allowFullScreen={true}
                            style={{
                                width: '100%',
                                aspectRatio: '16/9',
                                border: 'none',
                                borderRadius: 12,
                            }}
                            src={`https://vidsrc.xyz/embed/movie/${movieId}`}
                        />
                    )}
                </Box>
                {/* details */}
                <Box sx={{
                    width: { xs: "100%", lg: "100%" },
                    pl: { xs: .5, lg: 0 },
                    mt: { xs: 1.5, lg: 2 }
                }}>
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
                        &nbsp; <FaStar style={{ color: '#a2ff00' }} /> &nbsp;{Math.round(movieDetails.vote_average * 10) / 10}</span>

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
            <Box sx={{ mt: 12 }}>
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
                            fontSize: { xs: '18px', lg: '20px' },
                            mt: 8
                        }}>
                        No related movies found &nbsp; : (</Typography>
                )}
            </Box>
        </Box>
    );
};

export default MovieScreen;