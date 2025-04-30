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
import Videos from "../components/videos";

// services
import { getGeneralDetails } from "../services/general-details";
import { getReviewDetails } from "../services/review-details";
import { getCastDetails } from "../services/cast-details";
import { getVideos } from "../services/vidoes";
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
    const [videoKeys, setVideoKeys] = useState<string[]>([])
    const [lightsOffClicked, setLightsOffClicked] = useState<boolean>(false);

    const location = useLocation();
    const navigate = useNavigate();
    const tvId = new URLSearchParams(location.search).get("id");

    // get tv show details
    const getDetails = async () => {
        if (!tvId) navigate('/');

        // clean states
        setMovieDetails({});
        setCastDetails([]);
        setRelatedContent([]);
        setReviews([]);
        setVideoKeys([]);

        const response = await getGeneralDetails(tvId as string, "tv");
        if (response.status == 200) {
            console.log(response.data)
            setMovieDetails({ ...response.data });
            await getCast();
            await getRelatedContent();
            await getReviews();
            await getClips();
            await sortEpisodeDetails(response.data.seasons);
        }
        else {
            console.error(`Error occured - ${response.data}`);
        }
    };

    // sort episodes
    const sortEpisodeDetails = async (seasons: any[]) => {
        try {
            const legitSeasons: any[] = seasons[0].name == 'Specials' ? seasons.slice(1) : seasons;
            const snapshot: SeasonProps[] = []
            for (const season of legitSeasons) {
                const response = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/season/${season.season_number}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
                const data = await response.json();
                const episodes: any[] = data.episodes;

                const imagesSnaphot: string[] = [];
                const namesSnaphot: string[] = [];
                episodes.map((episode) => {
                    imagesSnaphot.push(episode.still_path);
                    namesSnaphot.push(episode.name);
                });

                snapshot.push({
                    season: season.season_number,
                    numOfEpisodes: season.episode_count,
                    image: imagesSnaphot,
                    names: namesSnaphot
                });
            }
            console.log(snapshot);
            setSeasonDeatils([...snapshot]);
        } catch (error) {
            console.error(`Error - ${error}`)
        }
    }

    // cast details
    const getCast = async () => {
        const response = await getCastDetails(tvId as string, "tv");
        if (response.status == 200) {
            setCastDetails(response.data as any[]);
        } else {
            console.error(`Error occured - ${response.data}`);
        }

    }

    // reviews
    const getReviews = async () => {
        const response = await getReviewDetails(tvId as string, "tv");
        const reviewsSnapshot: ReviewDataProps[] = [];
        if (response.status == 200) {
            (response.data as any[]).map((detail: any) => {
                reviewsSnapshot.push({
                    authorUsername: detail.author,
                    review: detail.content,
                    date: detail.created_at
                })
            })
            setReviews([...reviewsSnapshot]);
        } else {
            console.error(`Error occured - ${response.data}`);
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

    // trailers and videos
    const getClips = async () => {
        const response = await getVideos(tvId as string, "tv");
        if (response.status == 200) {
            const snapshot: string[] = [];
            (response.data as any[]).map((result) => { result.site == 'YouTube' && snapshot.push(result.key) });
            setVideoKeys([...snapshot]);
        } else {
            console.error(`Error occured - ${response.data}`);
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
        getDetails();
        return () => {
            setMovieDetails({});
            setRelatedContent([]);
            setCastDetails([]);
            setReviews([]);
            setVideoKeys([]);
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
                        height: 55,
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
                    <Reviews reviews={reviews} defaultExpanded={true} />
                </Box>)}

                {/* trailers */}
                <Box sx={{ mt: 8, display: !lightsOffClicked ? "block" : "none" }}>
                    <Videos videokeys={videoKeys} />
                </Box>

                {/* related content */}
                {!lightsOffClicked ? (
                    <Box sx={{ mt: 8, mb: 15 }}>
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