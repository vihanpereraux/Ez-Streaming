import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

// MUI
import { Box, Typography, Button } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// components
import LoadingPreview from "../components/LoadingPreview";
import MovieCarousel from "../components/MovieCarousel";
import MoviePlayer from "../components/movie-player";
import MovieDetails from "../components/ContentDetails";
import Navbar from "../components/Navbar";
import Credits from "../components/credits";
import Reviews from "../components/reviews";
import Videos from "../components/videos";

// services
import { getGeneralDetails } from "../services/screens/general-details";
import { getRelatedMovies } from "../services/api";
import { getReviewDetails } from "../services/screens/review-details";
import { getCastDetails } from "../services/screens/cast-details";
import { getVideos } from "../services/screens/vidoes";
import { getAllMovieProviders } from "../services/providers/movie-providers";

// props
import { MoviesProps } from "../interfaces/props";
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
import { ReviewDataProps } from "../interfaces/props";
import { CarosuelCardProps } from "../interfaces/props";
import { MovieProviderDetailsProps } from "../interfaces/props";

// stylesheet
const tabStyles = {
    color: 'white',
    fontFamily: 'Rubik',
    textTransform: 'capitalize',
    fontWeight: 420,
    textDecoration: 'none',
    mr: 1.25,
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const MovieScreen: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [movieProviders, setMovieProviders] = useState<MovieProviderDetailsProps[]>([]);
    const [movieDetails, setMovieDetails] = useState<any>({});
    const [relatedContent, setRelatedContent] = useState<MoviesProps[]>([]);
    const [lightsOffClicked, setLightsOffClicked] = useState<boolean>(false);
    const [value, setValue] = React.useState(0);
    const [castDetails, setCastDetails] = useState<any[]>([]);
    const [reviews, setReviews] = useState<ReviewDataProps[]>([]);
    const [videoKeys, setVideoKeys] = useState<string[]>([])

    const navigate = useNavigate();
    const location = useLocation();
    const movieId = new URLSearchParams(location.search).get("id");

    const handleChange = (e: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        console.log(e);
    };

    // get movie details
    const getDetails = async () => {
        if (!movieId) navigate('/');

        // clean states
        setMovieDetails({});
        setCastDetails([]);
        setRelatedContent([]);
        setReviews([]);
        setVideoKeys([]);
        setIsLoading(true);

        const response = await getGeneralDetails(movieId as string, "movie");
        if (response.status == 200) {
            setMovieDetails({ ...response.data });
            await getCast();
            await getRelatedContent();
            await getReviews();
            await getClips();
        }
        else {
            console.error(`Error occured - ${response.data}`);
        }
        updateUserWatchState(response.data, movieId as string);
        setIsLoading(false);
    };

    // cast details
    const getCast = async () => {
        const response = await getCastDetails(movieId as string, "movie");
        if (response.status == 200) {
            setCastDetails(response.data as any[]);
        } else {
            console.error(`Error occured - ${response.data}`);
        }
    }

    // reviews
    const getReviews = async () => {
        const response = await getReviewDetails(movieId as string, "movie");
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

    // get related movies
    const getRelatedContent = async () => {
        if (!movieId) return;

        const content = await getRelatedMovies([], Number(movieId));
        if (content) {
            setRelatedContent(content);
        }
    };

    // trailers and videos
    const getClips = async () => {
        const response = await getVideos(movieId as string, "movie");
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
        const providers = getAllMovieProviders();
        setMovieProviders([...providers]);
    }, [movieId])

    useEffect(() => {
        getDetails();

        return () => {
            setMovieDetails({});
            setRelatedContent([]);
            setCastDetails([]);
            setReviews([]);
            setVideoKeys([]);
        };
    }, [movieId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [movieId]);

    const updateUserWatchState = (movieDetails: any, movieId: string) => {
        const watchedMoviesSnaphot: CarosuelCardProps[] = JSON.parse(localStorage.getItem('watchedMovies') || '[]');
        const isContentAvailable = watchedMoviesSnaphot.find(item => item.id.toString() == movieId);
        if (!isContentAvailable) {
            watchedMoviesSnaphot.push(
                {
                    original_name: movieDetails.original_name,
                    poster_path: movieDetails.poster_path,
                    id: parseInt(movieId),
                    title: movieDetails.title,
                    overview: movieDetails.overview,
                    release_date: movieDetails.release_date,
                    vote_average: movieDetails.vote_average,
                    first_air_date: movieDetails.first_air_date,
                    type: "movie"
                }
            )
        }
        localStorage.setItem('watchedMovies', JSON.stringify(watchedMoviesSnaphot));
    }

    return (
        <>
            {!lightsOffClicked && <Navbar />}

            {isLoading ? (
                <LoadingPreview />
            ) : (
                <>
                    <Box
                        className="movie_screen"
                        key={movieId}
                        sx={{
                            pt: 6,
                            pl: { xs: 2, lg: 3 },
                            pr: { xs: 2, lg: 3 }
                        }}>
                        {/* tabs, players and information */}
                        <Box sx={{ display: { xs: "block", lg: "block" } }}>
                            <Box sx={{ width: { xs: "100%", lg: "100%" } }}>
                                {/* tabs */}
                                <Box sx={{
                                    borderBottom: 1,
                                    borderColor: 'divider',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <Tabs
                                        sx={{
                                            opacity: !lightsOffClicked ? 1 : 0,
                                            pointerEvents: !lightsOffClicked ? "auto" : "none"
                                        }}
                                        value={value}
                                        onChange={handleChange}
                                        aria-label="basic tabs example">
                                        {movieProviders.map((provider, index) => (
                                            <Tab sx={tabStyles} label={provider.displayName} {...a11yProps(index)} />
                                        ))}
                                    </Tabs>

                                    {/* toggle */}
                                    <Button sx={{
                                        display: { xs: 'none', md: 'block' },
                                        color: '#a2ff00',
                                        fontFamily: 'Rubik',
                                        fontSize: 13,
                                        textTransform: 'capitalize',
                                        backgroundColor: 'balck',
                                        borderRadius: 2,
                                        fontWeight: 420
                                    }} onClick={manageLights}>
                                        {lightsOffClicked ? "Turn Lights On" : "Turn Lights Off"}
                                    </Button>
                                </Box>

                                {/* note for the player switch */}
                                {!lightsOffClicked && (
                                    <Typography sx={{
                                        color: ' white',
                                        opacity: .7,
                                        fontFamily: 'Rubik',
                                        mt: 2.5,
                                        fontWeight: 400,
                                        fontSize: 12,
                                        mb: '-10px'
                                    }}>Change the player above if you are not satisfied with the current player 😃</Typography>

                                )}

                                {/* players */}
                                {movieProviders.map((provider, index) => (
                                    <CustomTabPanel value={value} index={index} key={index}>
                                        {movieId && (
                                            <MoviePlayer id={movieId} serverGroup={provider.providerName} />
                                        )}
                                    </CustomTabPanel>
                                ))}
                            </Box>

                            {/* details */}
                            {!lightsOffClicked && <Box sx={{
                                width: { xs: "100%", lg: "100%" },
                                pl: { xs: .5, lg: 0 },
                                mt: { xs: 1.5, lg: 3 },
                            }}>
                                <MovieDetails props={movieDetails} />
                            </Box>}
                        </Box>

                        {/* cast info / credits */}
                        {!lightsOffClicked && (<Box sx={{ mt: 5 }}>
                            <Credits contentTitle={movieDetails.original_title} castDetails={castDetails} />
                        </Box>)}

                        {/* reviews */}
                        {!lightsOffClicked && (<Box sx={{ mt: 5 }}>
                            <Reviews reviews={reviews} defaultExpanded={true} />
                        </Box>)}

                        {/* trailers */}
                        <Box sx={{ mt: 5, display: !lightsOffClicked ? "block" : "none" }}>
                            {videoKeys.length > 3 ? (
                                <Videos videokeys={videoKeys.slice(0, 3)} />
                            ) : (
                                <Videos videokeys={videoKeys} />
                            )}
                        </Box>

                        {/* related content */}
                        {!lightsOffClicked ? (<Box sx={{ mt: 8, mb: 15 }}>
                            {relatedContent.length > 0 ? (
                                <MovieCarousel
                                    type="movie"
                                    title="Movies You May Love : )"
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
                                        No related movies found &nbsp; : (</Typography>
                                    <Box sx={{ mb: 15 }}></Box>
                                </>
                            )}
                        </Box>) : (
                            <Box sx={{ mb: { xs: 12, lg: 12 } }} />
                        )}
                    </Box>
                </>
            )}
        </>
    );
};

export default MovieScreen;