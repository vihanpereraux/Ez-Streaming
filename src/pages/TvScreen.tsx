import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import "react-multi-carousel/lib/styles.css";

// MUI
import { Box, Typography, Button } from "@mui/material";

// components
import MovieCarousel from "../components/MovieCarousel";
import Navbar from "../components/Navbar";
import TvEpisodes from "../components/tv-episodes";
import Credits from "../components/credits";
import Reviews from "../components/reviews";

// services
import { getRelatedTVShows } from "../services/Api";

// props
import { MoviesProps } from "../interfaces/props";
import { ReviewDataProps } from "../interfaces/props";
import { SeasonProps } from "../interfaces/props";
interface UserSelectionProps {
    season: number,
    episodeNumber: number
}

const TvScreen: React.FC = () => {
    const [movieDetails, setMovieDetails] = useState<any>({});
    const [relatedContent, setRelatedContent] = useState<MoviesProps[]>([])
    const [castDetails, setCastDetails] = useState<any[]>([]);
    const [reviews, setReviews] = useState<ReviewDataProps[]>([]);
    const [seasonDetails, setSeasonDeatils] = useState<SeasonProps[]>([])
    const [userSelection, setUserSelection] = useState<UserSelectionProps>({
        season: 1,
        episodeNumber: 1
    });
    const [lightsOffClicked, setLightsOffClicked] = useState<boolean>(false);

    const location = useLocation();
    const navigate = useNavigate();
    const tvId = new URLSearchParams(location.search).get("id");

    // get tv show details
    const getTVDetails = async () => {
        if (!tvId) navigate('/');

        setMovieDetails({});
        setRelatedContent([]);
        setCastDetails([]);
        setReviews([]);

        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/${tvId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
            const data = await response.json();
            setMovieDetails(data);
            await getCastDetails();
            await getReviews();
            await getRelatedContent();
            sortEpisodeDetails(data.seasons)
        } catch (error) {
            console.error("Error fetching tv show details:", error);
        }
    };

    // sort episodes
    const sortEpisodeDetails = (seasons: any[]) => {
        try {
            const legitSeasons: any[] = seasons[0].name == 'Specials' ? seasons.slice(1) : seasons;
            const snapshot: SeasonProps[] = []
            legitSeasons.map((season: any) => {
                snapshot.push({
                    season: season.season_number,
                    numOfEpisodes: season.episode_count
                });
            });
            console.log(snapshot);
            setSeasonDeatils([...snapshot]);
        } catch (error) {
            console.error(`Error - ${error}`)
        }
    }

    // cast details
    const getCastDetails = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
            const data = await response.json();
            const castArr: any[] = data.cast;
            setCastDetails([...castArr]);
        } catch (error) {
            console.error("Error fetching details:", error);
        }
    }

    // reviews
    const getReviews = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/reviews?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
            const data = await response.json();
            const reviewData: any[] = data.results;

            const reviewsSnapshot: ReviewDataProps[] = []
            reviewData.map((detail: any) => {
                reviewsSnapshot.push({
                    authorUsername: detail.author,
                    review: detail.content,
                    date: detail.created_at
                })
            })
            setReviews([...reviewsSnapshot]);
        } catch (error) {
            console.error("Error fetching details:", error);
        }
    }

    // get related tv shows
    const getRelatedContent = async () => {
        if (!tvId) return;

        const content = await getRelatedTVShows([], Number(tvId));
        if (content) {
            setRelatedContent(content);
        }
    }

    // manage lights
    const manageLights = () => {
        if (lightsOffClicked) {
            setLightsOffClicked(false);
        }
        else {
            setLightsOffClicked(true);
        }
    }

    useEffect(() => {
        getTVDetails();
        return () => {
            setMovieDetails({});
            setRelatedContent([]);
            setCastDetails([]);
            setReviews([]);
        }
    }, [tvId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [tvId]);

    return (
        <>
            {!lightsOffClicked && <Navbar />}

            <Box
                key={tvId}
                sx={{
                    pt: 6,
                    pl: { xs: 2, lg: 6 },
                    pr: { xs: 2, lg: 6 }
                }}>

                {/* toggle */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <Button sx={{
                        display: { xs: 'none', md: 'block' },
                        color: '#a2ff00',
                        fontFamily: 'Rubik',
                        fontSize: 14,
                        textTransform: 'capitalize',
                        backgroundColor: 'balck',
                        borderRadius: 2,
                        height : 55,
                        mb: 1
                    }}
                        onClick={manageLights}
                    >{lightsOffClicked ? "Turn Lights On" : "Turn Lights Off"}</Button>
                </Box>


                {/* player and details */}
                <Box sx={{ display: { xs: "block", lg: "block" } }}>
                    {/* player */}
                    <Box sx={{ width: { xs: "100%", lg: "100%" } }}>
                        <iframe
                            key={tvId}
                            allowFullScreen={true}
                            style={{
                                width: '100%',
                                aspectRatio: '16/9',
                                border: 'none',
                                borderRadius: 12,
                            }}
                            src={`https://vidfast.pro/tv/${tvId}/${userSelection.season}/${userSelection.episodeNumber}?theme=a2ff00`}>
                        </iframe>
                    </Box>

                    {/* details */}
                    {!lightsOffClicked && <Box sx={{
                        width: { xs: "100%", lg: "100%" },
                        pl: { xs: .5, lg: 0 },
                        mt: { xs: 1.5, lg: 3 }
                    }}>
                        <Typography
                            sx={{
                                color: 'white',
                                textAlign: 'left',
                                fontSize: 22,
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
                            &nbsp; <FaStar style={{ color: '#a2ff00' }} /> &nbsp;{Math.round(movieDetails.vote_average * 10) / 10}</span>

                        <Typography
                            sx={{
                                fontFamily: 'Rubik',
                                fontSize: 16,
                                lineHeight: 1.6,
                                fontWeight: 360,
                                mt: 3,
                                color: 'white'
                            }}>{movieDetails.overview}</Typography>
                    </Box>}
                </Box>

                {/* seasons and episodes */}
                {!lightsOffClicked && (
                    < Box sx={{ mt: 6 }}>
                        <TvEpisodes
                            seasonDetails={seasonDetails}
                            userSelection={userSelection}
                            setUserSelection={setUserSelection} />
                    </Box>
                )}

                {/* cast info */}
                {!lightsOffClicked && (<Box sx={{ mt: 6 }}>
                    <Credits castDetails={castDetails} />
                </Box>)}

                {/* reviews */}
                {!lightsOffClicked && (<Box sx={{ mt: 6 }}>
                    <Reviews reviews={reviews} />
                </Box>)}

                {/* related content */}
                {!lightsOffClicked ? (
                    <Box sx={{ mt: 6, mb: 15 }}>
                        {relatedContent.length > 0 ? (
                            <MovieCarousel
                                type="tv"
                                title="TV Shows You May Love : )"
                                content={relatedContent} />
                        ) : (
                            <>
                                <Typography
                                    sx={{
                                        fontWeight: 450,
                                        fontFamily: 'Rubik',
                                        color: 'white',
                                        fontSize: { xs: '18px', lg: '20px' },
                                        mt: 8
                                    }}>
                                    No related tv shows found &nbsp; : (</Typography>
                                <Box sx={{ mb: 15 }}></Box>
                            </>
                        )}
                    </Box>
                ) : (
                    <Box sx={{ mb: 15 }}></Box>
                )}
            </Box >
        </>
    )
}

export default TvScreen;