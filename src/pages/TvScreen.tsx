import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import "react-multi-carousel/lib/styles.css";

// MUI
import { Box, Typography, Button } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// components
import MovieCarousel from "../components/MovieCarousel";
import Navbar from "../components/Navbar";
import TvPlayer from "../components/tv-player";
import TvEpisodes from "../components/tv-episodes";
import Credits from "../components/credits";
import Reviews from "../components/reviews";
import Videos from "../components/videos";
import LoadingPreview from "../components/LoadingPreview";

// services
import { getGeneralDetails } from "../services/screens/general-details";
import { getReviewDetails } from "../services/screens/review-details";
import { getCastDetails } from "../services/screens/cast-details";
import { getVideos } from "../services/screens/vidoes";
import { getRelatedTVShows } from "../services/api";

// props
import { MoviesProps } from "../interfaces/props";
import { ReviewDataProps } from "../interfaces/props";
import { SeasonProps } from "../interfaces/props";
interface UserSelectionProps {
    season: number,
    episodeNumber: number
}
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
import { CarosuelCardProps } from "../interfaces/props";
import { EpisodeDetailsProps } from "../interfaces/props";

// stylesheet
const tabStyles = {
    color: 'white',
    fontFamily: 'Rubik',
    textTransform: 'capitalize',
    fontWeight: 420,
    textDecoration: 'none',
    mr: 2
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

const TvScreen: React.FC = () => {
    const [value, setValue] = React.useState(0);
    const [movieDetails, setMovieDetails] = useState<any>({});
    const [relatedContent, setRelatedContent] = useState<MoviesProps[]>([])
    const [castDetails, setCastDetails] = useState<any[]>([]);
    const [reviews, setReviews] = useState<ReviewDataProps[]>();
    const [seasonDetails, setSeasonDeatils] = useState<SeasonProps[]>([])
    const [userSelection, setUserSelection] = useState<UserSelectionProps>({
        season: 1,
        episodeNumber: 1
    });
    const [videoKeys, setVideoKeys] = useState<string[]>([])
    const [lightsOffClicked, setLightsOffClicked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const location = useLocation();
    const navigate = useNavigate();
    const tvId = new URLSearchParams(location.search).get("id");

    const handleChange = (e: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        console.log(e);
    };

    // get tv show details
    const getDetails = async () => {
        if (!tvId) navigate('/');

        // clean states
        setMovieDetails({});
        setCastDetails([]);
        setRelatedContent([]);
        setReviews([]);
        setVideoKeys([]);
        setIsLoading(true);

        const response = await getGeneralDetails(tvId as string, "tv");
        if (response.status == 200) {
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
        updateUserWatchState(response.data, tvId as string);
        setIsLoading(false);
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
                const airDatesSnaphot: string[] = [];

                let episodeDetails: EpisodeDetailsProps = { stills: [] as string[], names: [] as string[], airDates: [] as string[] }

                episodes.map((episode) => {
                    imagesSnaphot.push(episode.still_path);
                    namesSnaphot.push(episode.name);
                    airDatesSnaphot.push(episode.air_date);
                });
                episodeDetails = {
                    stills: imagesSnaphot,
                    names: namesSnaphot,
                    airDates: airDatesSnaphot
                }
                snapshot.push({
                    season: season.season_number,
                    numOfEpisodes: season.episode_count,
                    episodeDetails: episodeDetails
                });
            }
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

    const updateUserWatchState = (details: any, tvId: string) => {
        const watchedTvShowsSnaphot: CarosuelCardProps[] = JSON.parse(localStorage.getItem('watchedTvShows') || '[]');
        const isContentAvailable = watchedTvShowsSnaphot.find(item => item.id.toString() == tvId);
        if (!isContentAvailable) {
            watchedTvShowsSnaphot.push(
                {
                    original_name: details.original_name,
                    poster_path: details.poster_path,
                    id: parseInt(tvId),
                    title: details.title,
                    overview: details.overview,
                    release_date: details.release_date,
                    vote_average: details.vote_average,
                    first_air_date: details.first_air_date,
                    type: "tv"
                }
            )
        }
        localStorage.setItem('watchedTvShows', JSON.stringify(watchedTvShowsSnaphot));
    }

    return (
        <>
            {!lightsOffClicked && <Navbar />}

            {isLoading ? (
                <LoadingPreview />
            ) : (
                <>
                    <Box
                        className="tv_screen"
                        key={tvId}
                        sx={{
                            pt: 6,
                            pl: { xs: 2, lg: 3 },
                            pr: { xs: 2, lg: 3 }
                        }}>

                        {/* tabs and players */}
                        <Box sx={{ width: { xs: "100%", lg: "100%" } }}>
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
                                    {/* default server group */}
                                    {['Chad Player', 'VimStar', 'Star Cinema', 'Popcorn Bunjie', 'Cinema Canvas', 'Reel Magic'].map((label, index) => (
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
                                    mt: 3,
                                    fontWeight: 400,
                                    fontSize: 14,
                                    mb: '-10px'
                                }}>Change the player above if you are not satisfied with the current player 😃</Typography>
                            )}

                            {/* players */}
                            {['videsrc.xyz', 'videsrc.cc', 'vidjoy.pro', 'videasy', 'videasy.net', 'multiembed.mov', 'vidfast.pro'].map((provider, index) => (
                                <CustomTabPanel value={value} index={index} key={index}>
                                    {tvId && (
                                        <TvPlayer
                                            id={tvId}
                                            serverGroup={provider}
                                            season={(userSelection.season).toString()}
                                            episode={(userSelection.episodeNumber).toString()} />
                                    )}
                                </CustomTabPanel>
                            ))}
                        </Box>

                        {/* details */}
                        <Box sx={{ display: { xs: "block", lg: "block" } }}>
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
                                    {/* first air data */}
                                    {movieDetails.first_air_date ? movieDetails.first_air_date.slice(0, 4) : '...'} &nbsp; ⋅

                                    {/* rating */}
                                    &nbsp; <FaStar style={{ color: '#a2ff00' }} /> &nbsp;{Math.round(movieDetails.vote_average * 10) / 10} &nbsp;⋅
                                </span>

                                {/* genre */}
                                &nbsp;&nbsp;{movieDetails.genres.map((genre: any, index: any) => (
                                    <span key={index} style={{ color: 'white', fontFamily: 'Rubik', fontSize: 14, marginRight: 6 }}>{genre.name}</span>
                                ))}
                                <Typography
                                    sx={{
                                        fontFamily: 'Rubik',
                                        fontSize: 15,
                                        lineHeight: 1.65,
                                        fontWeight: 400,
                                        mt: 3,
                                        color: 'white'
                                    }}>{movieDetails.overview}</Typography>
                            </Box>}
                        </Box>

                        {/* seasons and episodes */}
                        {!lightsOffClicked && (
                            <Box sx={{ mt: 6 }}>
                                <TvEpisodes
                                    seasonDetails={seasonDetails}
                                    userSelection={userSelection}
                                    setUserSelection={setUserSelection} />
                            </Box>
                        )}

                        {/* cast info */}
                        {!lightsOffClicked && (<Box sx={{ mt: 6 }}>
                            <Credits contentTitle={movieDetails.original_name} castDetails={castDetails} />
                        </Box>)}

                        {/* reviews */}
                        {!lightsOffClicked && (<Box sx={{ mt: 6 }}>
                            {reviews && (
                                <Reviews reviews={reviews} defaultExpanded={true} />
                            )}
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
            )}
        </>
    )
}

export default TvScreen;