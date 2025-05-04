import React, { useState } from 'react'

// components
import Navbar from '../components/Navbar'
import WatchedCard from '../components/watched-card';

// MUI

import { Typography } from '@mui/material';
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
                }}>No previously watched {type === "movies" ? "movies" : "tv series"} found, Keep <span style={{ color: '#a2ff00' }}>streaming</span> !</Typography>
            </Box>
        </>
    )
}

const WatchHistory: React.FC = () => {
    const [value, setValue] = React.useState(0);
    const [watchedMovies, setWatchedMovies] = useState<CarosuelCardProps[]>(
        JSON.parse(localStorage.getItem('watchedMovies') || '[]')
    );
    const [originalMovieList, setOriginalMovieList] = useState<CarosuelCardProps[]>(
        JSON.parse(localStorage.getItem('watchedMovies') || '[]')
    );
    const [watchedTvShows] = useState<CarosuelCardProps[]>(
        JSON.parse(localStorage.getItem('watchedTvShows') || '[]')
    );

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        console.log(event);
    };

    const handleMoviesQuickSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        const keyword = e.target.value;
        const sortedList = originalMovieList.filter(item => item.title.toLowerCase().includes(keyword.toLowerCase()));
        console.log(sortedList);
        setWatchedMovies([...sortedList])
    }

    return (
        <>
            <Navbar />
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
                    borderBottom: 1,
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
                {/*  */}
                <CustomTabPanel value={value} index={0}>
                    <input
                        className="search_input"
                        onChange={handleMoviesQuickSearch}
                        // value={value}
                        style={{
                            width: '35%',
                            height: 55,
                            fontFamily: 'Rubik',
                            borderRadius: 8,
                            border: 'none',
                            backgroundColor: 'rgb(20, 20, 20)',
                            color: 'white',
                            fontSize: 16
                        }} placeholder="Search already watched movies" type="text" />

                    <Box sx={{
                        position: 'relative',
                        display: 'flex',
                        flexWrap: 'wrap',
                        width: { xs: 'auto', lg: '100%' },
                        gap: '0px',
                        pl: { xs: 2, lg: 0 },
                        pr: { xs: 2, lg: 0 }
                    }}>
                        {watchedMovies.length > 0 ? (
                            watchedMovies.map((movie, index) => (
                                <Box className="watched_movies_wrapper"
                                    sx={{
                                        width: { xs: 'calc(50% - 10px)', sm: 'calc(50% - 10px)', md: 'calc(33% - 10px)', lg: 'calc(20% - 10px)' },
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
                                </Box>

                            ))
                        ) : (
                            <EmptyNote type="movies" />
                        )}
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
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
                                        width: { xs: 'calc(50% - 10px)', sm: 'calc(50% - 10px)', md: 'calc(33% - 10px)', lg: 'calc(20% - 10px)' },
                                    }}
                                    key={index}>
                                    <Box sx={{ mb: 5 }}></Box>
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
                                </Box>

                            ))
                        ) : (
                            <EmptyNote type="tv shows" />
                        )}
                    </Box>
                </CustomTabPanel>
            </Box>

            <Box sx={{ mb: 15 }}></Box>
        </>
    )
}

export default WatchHistory