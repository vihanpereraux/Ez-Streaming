import React, { useEffect, useState } from 'react'

// components
import Navbar from '../components/Navbar'
import WatchedCard from '../components/watched-card';
import LoadingPreview from '../components/LoadingPreview';

// MUI
import { Typography, Button } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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
    fontWeight: 450,
    textDecoration: 'none'
}

const EmptyNote: React.FC<EmptyNoteProps> = ({ type }) => {
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Typography sx={{
                    fontSize: 15,
                    fontFamily: 'Rubik',
                    color: 'white',
                    opacity: 1,
                    mt: 10,
                    textAlign: 'center',
                }}>No previously watched {type === "movies" ? "Movies" : "Tv Shows"} found, Keep <span style={{ color: '#a2ff00' }}>streaming</span> !</Typography>
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
                        pt: 0,
                        mt: 2.5
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
                            <input
                                className="search_input"
                                onChange={handleMoviesQuickSearch}
                                style={{
                                    display: JSON.parse(localStorage.getItem('watchedMovies') || '[]').length > 0 ? "block" : "none",
                                    width: window.innerWidth < 1024 ? "100%" : "30%",
                                    height: 50,
                                    fontFamily: 'Rubik',
                                    borderRadius: 8,
                                    border: 'none',
                                    backgroundColor: 'rgb(30, 30, 30)',
                                    color: 'white',
                                    fontSize: 14,
                                    marginTop: 30,
                                    marginBottom: 20
                                }} placeholder="Search already watched movies" type="text" />
                        </Box>

                        <Box sx={{
                            position: 'relative',
                            display: 'flex',
                            flexWrap: 'wrap',
                            width: { xs: 'auto', lg: '100%' },
                            gap: '0px',
                            pl: { xs: 2, lg: 0 },
                            pr: { xs: 2, lg: 0 }
                        }}>
                            {watchedMovies.length > 0 ? (watchedMovies.map((movie, index) => (
                                <Box className="watched_movies_wrapper"
                                    sx={{
                                        width: { xs: 'calc(50% - 10px)', sm: 'calc(33.3% - 10px)', md: 'calc(20% - 10px)', lg: 'calc(16.66% - 10px)', xl: 'calc(16.6% - 10px)' },
                                    }} key={index}>
                                    <Box sx={{ mb: 4 }}>
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
                                                scale: .5,
                                                fontWeight: 600,
                                                position: 'absolute',
                                                top: 15,
                                                right: 0
                                            }} onClick={() => { removeItemsFromWatchHistory("movie", index) }}>✘</Button>
                                    </Box>
                                </Box>

                            ))
                            ) : (
                                <EmptyNote type="movies" />
                            )}
                        </Box>
                    </CustomTabPanel>

                    {/* watched tv shows cat.log */}
                    <CustomTabPanel value={value} index={1}>
                        <Box sx={{
                            display: "flex",
                            justifyContent: 'center',
                            mb: 3
                        }}>
                            <input
                                className="search_input"
                                onChange={handleTvShowsQuickSearch}
                                style={{
                                    display: JSON.parse(localStorage.getItem('watchedTvShows') || '[]').length > 0 ? "block" : "none",
                                    width: window.innerWidth < 1024 ? "100%" : "30%",
                                    height: 50,
                                    fontFamily: 'Rubik',
                                    borderRadius: 8,
                                    border: 'none',
                                    backgroundColor: 'rgb(30, 30, 30)',
                                    color: 'white',
                                    fontSize: 14,
                                    marginTop: 30,
                                    marginBottom: 20
                                }} placeholder="Search already watched tv shows" type="text" />
                        </Box>

                        <Box sx={{
                            position: 'relative',
                            display: 'flex',
                            flexWrap: 'wrap',
                            width: { xs: 'auto', lg: '100%' },
                            gap: '0px',
                            pl: { xs: 2, lg: 0 },
                            pr: { xs: 2, lg: 0 }
                        }}>
                            {watchedTvShows.length > 0 ? (
                                watchedTvShows.map((movie, index) => (
                                    <Box className="watched_movies_wrapper"
                                        sx={{
                                            width: { xs: 'calc(50% - 10px)', sm: 'calc(33.3% - 10px)', md: 'calc(20% - 10px)', lg: 'calc(16.66% - 10px)', xl: 'calc(16.6% - 10px)' },
                                        }}
                                        key={index}>
                                        <Box sx={{ mb: 2 }}></Box>

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
                                                scale: .5,
                                                fontWeight: 600,
                                                position: 'absolute',
                                                top: 15,
                                                right: 0
                                            }} onClick={() => { removeItemsFromWatchHistory("tv", index) }}>✘</Button>
                                    </Box>

                                ))
                            ) : (
                                <EmptyNote type="tv shows" />
                            )}
                        </Box>
                    </CustomTabPanel>
                </Box>
            )}

            <Box sx={{ mb: 15 }}></Box>
        </>
    )
}

export default WatchHistory