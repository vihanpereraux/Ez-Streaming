import React, { useEffect, useState } from 'react'

// components
import Navbar from '../components/navbar'
import WatchedCard from '../components/watched-card';
import LoadingPreview from '../components/loading-preview';

// MUI
import { Typography, Button } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// props
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
import { CarosuelCardProps } from '../interfaces/props';
interface EmptyNoteProps {
    type: "movies" | "tv shows"
}

const getSearchBarWidth = (screenWidth: number) => {
    if (0 < screenWidth && screenWidth < 600) {
        return '100%'
    }
    else if (600 < screenWidth && screenWidth < 1200) {
        return '60%'
    }
    else {
        return '30%'
    }
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

// stylesheet
const tabStyles = {
    color: 'white',
    fontFamily: 'Rubik',
    textTransform: 'capitalize',
    fontWeight: 400,
    fontSize: 13,
    textDecoration: 'none'
}

const EmptyNote: React.FC<EmptyNoteProps> = ({ type }) => {
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Typography sx={{
                    fontSize: 13,
                    fontFamily: 'Rubik',
                    color: 'white',
                    opacity: 1,
                    mt: 6,
                    textAlign: 'center',
                }}>No previously watched {type === "movies" ? "Movies" : "TV Shows"} found, Keep <span style={{ color: '#a2ff00' }}>streaming</span> !</Typography>
            </Box>
        </>
    )
}

const WatchHistory: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [value, setValue] = React.useState(0);
    const [watchedMovies, setWatchedMovies] = useState<CarosuelCardProps[]>(
        JSON.parse(localStorage.getItem('watchedMovies') || '[]')
    );
    const [originalMovieList, setOriginalMovieList] = useState<CarosuelCardProps[]>(
        JSON.parse(localStorage.getItem('watchedMovies') || '[]')
    );
    const [watchedTvShows, setWatchedTvShows] = useState<CarosuelCardProps[]>(
        JSON.parse(localStorage.getItem('watchedTvShows') || '[]')
    );
    const [originalTvShowList, setOriginalTvShowList] = useState<CarosuelCardProps[]>(
        JSON.parse(localStorage.getItem('watchedTvShows') || '[]')
    );

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        console.log(event);
    };

    // fzf for movies
    const handleMoviesQuickSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = e.target.value;
        const sortedList = originalMovieList.filter(item => item.title.toLowerCase().includes(keyword.toLowerCase()));
        setWatchedMovies([...sortedList]);
    }

    // fzf for tv shows
    const handleTvShowsQuickSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = e.target.value;
        const sortedList = originalTvShowList.filter(item => item.original_name.toLowerCase().includes(keyword.toLowerCase()));
        setWatchedTvShows([...sortedList]);
    }

    // remove items form the watch history
    const removeItemsFromWatchHistory = (contentType: string, index: number) => {
        if (contentType === "movie") {
            const tempMovieCollector: CarosuelCardProps[] = [...watchedMovies];
            tempMovieCollector.splice(index, 1);
            localStorage.setItem('watchedMovies', JSON.stringify(tempMovieCollector));
            setWatchedMovies([...tempMovieCollector]);
            setOriginalMovieList([...tempMovieCollector]);
        }
        else {
            const tempTvCollector: CarosuelCardProps[] = [...watchedTvShows];
            tempTvCollector.splice(index, 1);
            localStorage.setItem('watchedTvShows', JSON.stringify(tempTvCollector));
            setWatchedTvShows([...tempTvCollector]);
            setOriginalTvShowList([...tempTvCollector]);
        }
    }

    useEffect(() => {
        setIsLoading(false);
    }, [originalTvShowList])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <Navbar />

            {isLoading ? (
                <LoadingPreview />
            ) : (
                <Box
                    className="watch_history_wrapper"
                    sx={{
                        width: '100%',
                        pl: { xs: 2, lg: 3 },
                        pr: { xs: 2, lg: 3 },
                        pt: 5,
                        mt: 2.5,
                        minHeight: '100vh'
                    }}>
                    {/* tabs */}
                    <Box sx={{
                        borderColor: 'none',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            {["Movies", "TV Shows"].map((tabName, index) => (
                                <Tab sx={tabStyles} label={tabName} {...a11yProps(index)} />
                            ))}
                        </Tabs>
                    </Box>

                    {/* watched movies cat.log */}
                    <CustomTabPanel value={value} index={0}>
                        {/* fzf for watched movies */}
                        <Box sx={{
                            display: "flex",
                            justifyContent: 'center',
                            mb: 3
                        }}>
                            {originalMovieList.length > 0 && (
                                <input
                                    className="search_input"
                                    onChange={handleMoviesQuickSearch}
                                    style={{
                                        width: getSearchBarWidth(window.innerWidth),
                                        height: 50,
                                        fontFamily: 'Rubik',
                                        borderRadius: 8,
                                        border: 'none',
                                        backgroundColor: 'rgb(18, 18, 18)',
                                        color: 'white',
                                        fontSize: 13.5,
                                        marginTop: 30,
                                        marginBottom: 25
                                    }}
                                    placeholder="Search already watched movies"
                                    type="text"
                                />
                            )}
                        </Box>

                        {/* grid */}
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={0}>
                                {watchedMovies.length > 0 ? watchedMovies.map((movie, index) => (
                                    <Grid xs={6} sm={4} md={3} lg={2} key={index}>
                                        <Box sx={{
                                            mb: 2.75,
                                            position: 'relative',
                                        }}>
                                            <WatchedCard
                                                id={movie.id}
                                                overview={movie.overview}
                                                vote_average={movie.vote_average}
                                                release_date={movie.release_date}
                                                poster_path={movie.poster_path ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}` : `https://i.ibb.co/YTdfZHjX/no-preview.jpg`}
                                                title={movie.type === 'movie' ? movie.title : movie.original_name}
                                                original_name={movie.original_name}
                                                first_air_date={movie.first_air_date}
                                                type={movie.type} />

                                            <Button
                                                className='watched_items_remove_button'
                                                sx={{
                                                    color: 'black',
                                                    fontFamily: 'Rubik',
                                                    fontSize: 30,
                                                    textTransform: 'capitalize',
                                                    backgroundColor: '#a2ff00',
                                                    borderRadius: '50%',
                                                    aspectRatio: 1,
                                                    scale: .4,
                                                    fontWeight: 600,
                                                    position: 'absolute',
                                                    top: -8,
                                                    right: -8,
                                                    zIndex: 2
                                                }} onClick={() => { removeItemsFromWatchHistory("movie", index) }}>✘</Button>
                                        </Box>
                                    </Grid>
                                )) : (<EmptyNote type="movies" />)}
                            </Grid>
                        </Box>
                    </CustomTabPanel>

                    {/* watched tv shows cat.log */}
                    <CustomTabPanel value={value} index={1}>
                        <Box sx={{
                            display: "flex",
                            justifyContent: 'center',
                            mb: 3
                        }}>
                            {originalTvShowList.length > 0 && (
                                <input
                                    className="search_input"
                                    onChange={handleTvShowsQuickSearch}
                                    style={{
                                        width: getSearchBarWidth(window.innerWidth),
                                        height: 50,
                                        fontFamily: 'Rubik',
                                        borderRadius: 8,
                                        border: 'none',
                                        backgroundColor: 'rgb(18, 18, 18)',
                                        color: 'white',
                                        fontSize: 13.5,
                                        marginTop: 30,
                                        marginBottom: 20
                                    }}
                                    placeholder="Search already watched tv shows" type="text"
                                />
                            )}
                        </Box>

                        {/* grid */}
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={0}>
                                {watchedTvShows.length > 0 ? watchedTvShows.map((movie, index) => (
                                    <Grid xs={12} sm={4} md={3} lg={3} key={index}>
                                        <Box sx={{
                                            mb: 2.75,
                                            position: 'relative',
                                        }}>
                                            <WatchedCard
                                                id={movie.id}
                                                overview={movie.overview}
                                                vote_average={movie.vote_average}
                                                release_date={movie.release_date}
                                                poster_path={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : `https://i.ibb.co/YTdfZHjX/no-preview.jpg`}
                                                title={movie.type === 'movie' ? movie.title : movie.original_name}
                                                original_name={movie.original_name}
                                                first_air_date={movie.first_air_date}
                                                type={movie.type} />

                                            <Button
                                                className='watched_items_remove_button'
                                                sx={{
                                                    color: 'black',
                                                    fontFamily: 'Rubik',
                                                    fontSize: 30,
                                                    textTransform: 'capitalize',
                                                    backgroundColor: '#a2ff00',
                                                    borderRadius: '50%',
                                                    aspectRatio: 1,
                                                    scale: .4,
                                                    fontWeight: 600,
                                                    position: 'absolute',
                                                    top: -8,
                                                    right: -8,
                                                    zIndex: 2
                                                }} onClick={() => { removeItemsFromWatchHistory("tv", index) }}>✘</Button>
                                        </Box>
                                    </Grid>
                                )) : (<EmptyNote type="tv shows" />)}
                            </Grid>
                        </Box>
                    </CustomTabPanel>
                </Box>
            )}
        </>
    )
}

export default WatchHistory