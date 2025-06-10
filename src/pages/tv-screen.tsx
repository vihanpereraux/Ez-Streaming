import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import Lottie from "lottie-react";
import serverIcon from "../../public/icons/server-icon.json";
import premiumIcon from "../../public/icons/premium-icon.json";

// MUI
import { Box, Typography, Button } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// components
import LoadingPreview from "../components/loading-preview";
import AdDisclaimer from "../components/ad-disclaimer";
import TVCarousel from "../components/tv-carousel";
import Navbar from "../components/navbar";
import TvPlayer from "../components/tv-player";
import TvDetails from "../components/tv-details";
import TvEpisodes from "../components/tv-episodes";
import Credits from "../components/credits";
import Reviews from "../components/reviews";
import Videos from "../components/videos";

// services
import { getGeneralDetails } from "../services/screens/general-details";
import { getReviewDetails } from "../services/screens/review-details";
import { getCastDetails } from "../services/screens/cast-details";
import { getVideos } from "../services/screens/vidoes";
import { getRelatedTVShows } from "../services/api";
import { getAllTvProviders } from "../services/providers/tv-providers";

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
import { StreamProviderProps } from "../interfaces/props";

// stylesheet
const tabStyles = {
    color: 'white',
    fontFamily: 'Rubik',
    textTransform: 'capitalize',
    fontWeight: 420,
    textDecoration: 'none',
    mr: { xs: .75, md: 0, lg: 1.5 },
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
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [value, setValue] = React.useState(0);
    const [tvProviders, setTvProviders] = useState<StreamProviderProps[]>([]);
    const [tvDetails, setTvDetails] = useState<any>({});
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
    const [isContinuePressed, setIsContinuePressed] = useState<boolean>(
        JSON.parse(localStorage.getItem('adDisclaimerDisabled') || 'false') ? true : false
    );

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
        setTvDetails({});
        setCastDetails([]);
        setRelatedContent([]);
        setReviews([]);
        setVideoKeys([]);
        setIsLoading(true);

        const response = await getGeneralDetails(tvId as string, "tv");
        if (response.status == 200) {
            setTvDetails({ ...response.data });
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
        const providers = getAllTvProviders();
        setTvProviders([...providers])
    }, [tvId])

    useEffect(() => {
        getDetails();
        return () => {
            setTvDetails({});
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
                    poster_path: details.backdrop_path,
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

            {isLoading ? (<LoadingPreview />) : (
                <>
                    {isContinuePressed && (
                        <Box
                            className="tv_screen"
                            key={tvId}
                            sx={{
                                pt: 6,
                                pl: { xs: 1, lg: 2 },
                                pr: { xs: 1, lg: 2 },
                            }}>

                            {/* tabs and players */}
                            <Box sx={{ width: { xs: "100%", lg: "100%" } }}>
                                <Box sx={{
                                    borderBottom: 1,
                                    borderColor: 'divider',
                                    display: 'flex',
                                    justifyContent: { xs: 'center', lg: 'center' }
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
                                        {tvProviders.map((provider, index) => (
                                            <Tab sx={tabStyles} label={
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    {provider.premium ? (
                                                        <Lottie style={{ width: 18 }} animationData={premiumIcon} loop={true} />
                                                    ) : (
                                                        <Lottie style={{ width: 20 }} animationData={serverIcon} loop={true} />
                                                    )}
                                                    <Typography sx={{
                                                        fontFamily: 'Rubik',
                                                        fontWeight: { xs: 400, md: 400, lg: 400 },
                                                        fontSize: { xs: 13, md: 12, lg: 12 },
                                                        ml: 1.5
                                                    }}>{provider.displayName}</Typography>
                                                </Box>
                                            } {...a11yProps(index)} />
                                        ))}
                                    </Tabs>

                                    {/* toggle */}
                                    <Button sx={{
                                        display: 'none',
                                        // display: { xs: 'none', md: 'block' },
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
                                {/* {!lightsOffClicked && (
                                        <Typography sx={{
                                            color: ' white',
                                            opacity: .7,
                                            fontFamily: 'Rubik',
                                            mt: 3,
                                            fontWeight: 400,
                                            fontSize: 14,
                                            mb: '-10px'
                                        }}>Change the player above if you are not satisfied with the current player 😃</Typography>
                                    )} */}

                                {/* players */}
                                {tvProviders.map((provider, index) => (
                                    <CustomTabPanel value={value} index={index} key={index}>
                                        {tvId && (
                                            <TvPlayer
                                                id={tvId}
                                                serverGroup={provider.providerName}
                                                season={(userSelection.season).toString()}
                                                episode={(userSelection.episodeNumber).toString()}
                                                note={provider.note} />
                                        )}
                                    </CustomTabPanel>
                                ))}
                            </Box>

                            {/* details */}
                            {!lightsOffClicked && <Box sx={{
                                width: { xs: "100%", lg: "100%" },
                                pl: { xs: 0, lg: 0 },
                                mt: { xs: 2.5, md: 1, lg: 3 },
                            }}>
                                <TvDetails props={tvDetails} />
                            </Box>}

                            {/* seasons and episodes */}
                            {!lightsOffClicked && (
                                <Box sx={{ mt: 5 }}>
                                    <TvEpisodes
                                        seasonDetails={seasonDetails}
                                        userSelection={userSelection}
                                        setUserSelection={setUserSelection} />
                                </Box>
                            )}

                            {/* cast info */}
                            {!lightsOffClicked && (<Box sx={{ mt: 5 }}>
                                <Credits contentTitle={tvDetails.original_name} castDetails={castDetails} />
                            </Box>)}

                            {/* trailers */}
                            <Box sx={{ mt: 5, display: !lightsOffClicked ? "block" : "none" }}>
                                {videoKeys.length > 3 ? (
                                    <Videos videokeys={videoKeys.slice(0, 3)} title={tvDetails.original_name} />
                                ) : (
                                    <Videos videokeys={videoKeys} title={tvDetails.original_name} />
                                )}
                            </Box>

                            {/* reviews */}
                            {!lightsOffClicked && (<Box sx={{ mt: 4 }}>
                                {reviews && (
                                    <Reviews reviews={reviews} defaultExpanded={true} />
                                )}
                            </Box>)}

                            {/* related content */}
                            {!lightsOffClicked ? (
                                <Box sx={{ mt: reviews.length > 0 ? 4 : 5, mb: 12 }}>
                                    {relatedContent.length > 0 ? (
                                        <TVCarousel
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
                                            <Box sx={{ mb: { xs: 12, lg: 12 } }} />
                                        </>
                                    )}
                                </Box>
                            ) : (
                                <Box sx={{ mb: { xs: 12, lg: 12 } }} />
                            )}
                        </Box >
                    )}
                </>
            )}

            {!isLoading && (
                <AdDisclaimer setIsContinuePressed={setIsContinuePressed} />
            )}
        </>
    )
}

export default TvScreen;