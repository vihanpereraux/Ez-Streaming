import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
// MUI
import { Box, Typography } from "@mui/material";

// components
import MovieCarousel from "../components/MovieCarousel";

// services
import { getRelatedTVShows } from "../services/Api";

// props
import {
    MoviesProps,
    // ScreenNavigationProps
} from "../interfaces/props";

const TvScreen: React.FC = () => {
    const [movieDetails, setMovieDetails] = useState<any>({});
    const [relatedContent, setRelatedContent] = useState<MoviesProps[]>([])

    // movie props (nav)
    const location = useLocation();
    const params: any = new URLSearchParams(location.search);

    const relatedTVLocalArr: MoviesProps[] = []
    const getRelatedContent = async () => {
        const content = await getRelatedTVShows(relatedTVLocalArr, params.get("id"));
        if (content) { setRelatedContent([...content]); }
    }

    const getTVDetails = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${params.get("id")}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
        const data = await response.json();
        setMovieDetails({ ...data });
        if (movieDetails) {
            getRelatedContent();
        }
    }

    useEffect(() => {
        getTVDetails();
    }, [params.get("id")])


    return (
        <>
            <Box sx={{
                pt: 15,
                pl: { xs: 2, lg: 6 },
                pr: { xs: 2, lg: 6 }
            }}>
                <Box sx={{ display: { xs: "block", lg: "block" } }}>
                    <Box sx={{ width: { xs: "100%", lg: "100%" } }}>
                        <iframe
                            allowFullScreen={true}
                            style={{
                                width: '100%',
                                aspectRatio: '16/9',
                                border: 'none',
                                borderRadius: 12,
                            }}
                            src={`https://vidsrc.xyz/embed/tv/${params.get("id")}`}>
                        </iframe>
                    </Box>
                    {/* details */}
                    <Box sx={{
                        width: { xs: "100%", lg: "100%" },
                        pl: { xs: .5, lg: 0 },
                        mt: { xs: 1.5, lg: 3 }
                    }}>
                        <Typography
                            sx={{
                                color: 'white',
                                textAlign: 'left',
                                fontSize: 24,
                                fontFamily: 'Rubik',
                                fontWeight: 450,
                                mb: 1
                            }}>{movieDetails.original_name}</Typography>

                        {/* other details */}
                        <span style={{
                            color: 'white',
                            fontSize: 14,
                        }}>
                            {movieDetails.first_air_date ? movieDetails.first_air_date.slice(0, 4) : '...'} &nbsp;&nbsp;
                            <FaStar style={{ color: 'orange' }} /> &nbsp;{Math.round(movieDetails.vote_average * 10) / 10}</span>

                        <Typography
                            sx={{
                                fontFamily: 'Rubik',
                                fontSize: 16,
                                lineHeight: 1.6,
                                fontWeight: 360,
                                mt: 3,
                                color: 'white'
                            }}>{movieDetails.overview}</Typography>
                    </Box>
                </Box>

                {/* related content */}
                <Box sx={{ mt: 8 }}>
                    {relatedContent.length > 0 ? (
                        <MovieCarousel
                            type="tv"
                            title="TV Shows You May Love : )"
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
                            No related tv shows found &nbsp; : (</Typography>
                    )}
                </Box>
            </Box>
        </>
    )
}

export default TvScreen;