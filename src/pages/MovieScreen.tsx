import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// MUI
import { Box, Typography, Button } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// components
import MovieCarousel from "../components/MovieCarousel";
import Player from "../components/Player";
import MovieDetails from "../components/ContentDetails";
import Navbar from "../components/Navbar";

// services
import { getRelatedMovies } from "../services/Api";

// props
import { MoviesProps } from "../interfaces/props";
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

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
    const location = useLocation();
    const movieId = new URLSearchParams(location.search).get("id");
    const [value, setValue] = React.useState(0);
    const [lightsOffClicked, setLightsOffClicked] = useState<boolean>(false);

    const handleChange = (e: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        console.log(e);
    };

    // get movie details
    const getMovieDetails = async () => {
        if (!movieId) return;

        // clean states
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
                <Box sx={{ display: { xs: "block", lg: "block" } }}>
                    {/* player */}
                    <Box sx={{ width: { xs: "100%", lg: "100%" } }}>
                        <Box sx={{ width: '100%' }}>
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
                                    <Tab sx={tabStyles}
                                        label="Server Group 01"
                                        {...a11yProps(0)} />

                                    {/* server group two */}
                                    <Tab sx={tabStyles}
                                        label="Server Group 02"
                                        {...a11yProps(1)} />

                                    {/* server group two */}
                                    <Tab sx={tabStyles}
                                        label="Server Group 03"
                                        {...a11yProps(2)} />
                                </Tabs>

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

                            {/* player 01 - default */}
                            <CustomTabPanel value={value} index={0}>
                                {movieId && (
                                    <Player id={movieId} serverGroup="vidfast" />
                                )}
                            </CustomTabPanel>

                            {/* player 02 */}
                            <CustomTabPanel value={value} index={1}>
                                {movieId && (
                                    <Player id={movieId} serverGroup="vidsrc" />
                                )}
                            </CustomTabPanel>

                            {/* player 03 */}
                            <CustomTabPanel value={value} index={2}>
                                {movieId && (
                                    <Player id={movieId} serverGroup="superEmbed" />
                                )}
                            </CustomTabPanel>
                        </Box>
                    </Box>

                    {/* details */}
                    {!lightsOffClicked && <Box sx={{
                        width: { xs: "100%", lg: "100%" },
                        pl: { xs: .5, lg: 0 },
                        mt: { xs: 1.5, lg: 3 }
                    }}>
                        <MovieDetails props={movieDetails} />
                    </Box>}
                </Box>

                {/* related content */}
                {!lightsOffClicked && <Box sx={{ mt: 12 }}>
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
                </Box>}
            </Box>
        </>
    );
};

export default MovieScreen;
