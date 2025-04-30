import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

// MUI
import { Box, Typography, Button } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// components
import MovieCarousel from "../components/MovieCarousel";
import Player from "../components/Player";
import MovieDetails from "../components/ContentDetails";
import Navbar from "../components/Navbar";
import Credits from "../components/credits";
import Reviews from "../components/reviews";
import Videos from "../components/videos";

// services
import { getRelatedMovies } from "../services/Api";

// props
import { MoviesProps } from "../interfaces/props";
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
import { ReviewDataProps } from "../interfaces/props";

// stylesheet
const tabStyles = {
    color: 'white',
    fontFamily: 'Rubik',
    textTransform: 'capitalize',
    fontWeight: 450,
    textDecoration: 'none'
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
    const getMovieDetails = async () => {
        if (!movieId) navigate('/');

        // clean states
        setMovieDetails({});
        setCastDetails([]);
        setRelatedContent([]);
        setReviews([]);
        setVideoKeys([]);

        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
            );
            const data = await response.json();
            setMovieDetails(data);
            await getCastDetails();
            await getRelatedContent();
            await getReviews();
            await getVideos();
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    // cast details
    const getCastDetails = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
            const data = await response.json();
            const castArr: any[] = data.cast;
            setCastDetails([...castArr]);
        } catch (error) {
            console.error(`Error - ${error}`);
        }
    }

    // reviews
    const getReviews = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
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
    const getVideos = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
            const data = await response.json();
            const results: any[] = data.results;
            const snapshot: string[] = [];
            results.map((result) => { result.site == 'YouTube' && snapshot.push(result.key) });
            setVideoKeys([...snapshot]);
        } catch (error) {
            console.error(`Error - ${error}`);
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
        getMovieDetails();

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

    return (
        <>
            {!lightsOffClicked ?
                (<Navbar />)
                :
                (<div style={{ opacity: 0, pointerEvents: 'none' }}><Navbar /></div>)}

            <Box
                className="movie_screen"
                key={movieId}
                sx={{
                    pt: 6,
                    pl: { xs: 2, lg: 6 },
                    pr: { xs: 2, lg: 6 }
                }}>
                {/* tabs and players */}
                <Box sx={{ display: { xs: "block", lg: "block" } }}>
                    <Box sx={{ width: { xs: "100%", lg: "100%" } }}>
                        {/* tabs */}
                        <Box sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: '-12px'
                        }}>
                            <Tabs
                                sx={{
                                    opacity: !lightsOffClicked ? 1 : 0,
                                    pointerEvents: !lightsOffClicked ? "auto" : "none"
                                }}
                                value={value}
                                onChange={handleChange}
                                aria-label="basic tabs example">
                                {/* default server group */}
                                {['Server Group 01', 'Server Group 02', 'Server Group 03'].map((label, index) => (
                                    <Tab sx={tabStyles}
                                        label={label}
                                        {...a11yProps(index)} />
                                ))}
                            </Tabs>

                            {/* toggle */}
                            <Button sx={{
                                display: { xs: 'none', md: 'block' },
                                color: '#a2ff00',
                                fontFamily: 'Rubik',
                                fontSize: 14,
                                textTransform: 'capitalize',
                                backgroundColor: 'balck',
                                borderRadius: 2
                            }}
                                onClick={manageLights}
                            >{lightsOffClicked ? "Turn Lights On" : "Turn Lights Off"}</Button>
                        </Box>

                        {/* players */}
                        {['vidfast', 'vidsrc', 'superEmbed'].map((provider, index) => (
                            <CustomTabPanel value={value} index={index} key={index}>
                                {movieId && (
                                    <Player id={movieId} serverGroup={provider} />
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
                    <Box sx={{ mb: 15 }}></Box>
                )}
            </Box>
        </>
    );
};

export default MovieScreen;
