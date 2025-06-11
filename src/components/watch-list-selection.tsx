import React from "react";

// MUI
import { Button } from "@mui/material";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

// props
import {
    CarosuelCardProps,
    WatchListSelectionProps
} from "../interfaces/props";


const WatchListSelection: React.FC<WatchListSelectionProps> = ({ type, props }) => {
    const [watchListMovies, setWatchListMovies] = React.useState<CarosuelCardProps[]>(
        JSON.parse(localStorage.getItem('watchListMovies') || '[]')
    )
    const [watchListTvshows, setWatchListTvshows] = React.useState<CarosuelCardProps[]>(
        JSON.parse(localStorage.getItem('watchListTvShows') || '[]')
    )

    const manageWatchList = (type: "movie" | "tv", props: WatchListSelectionProps['props']) => {
        if (type == "movie") {
            let data: CarosuelCardProps[] = JSON.parse(localStorage.getItem('watchListMovies') || '[]');
            const isMovieFound = data.find(item => item.id == props.id);
            if (!isMovieFound) {
                data.push({
                    original_name: props.original_name,
                    poster_path: props.poster_path,
                    id: props.id,
                    title: props.title,
                    overview: props.overview,
                    release_date: props.release_date,
                    vote_average: props.vote_average,
                    first_air_date: props.first_air_date,
                    type: type
                });
            } else {
                const targetIndex = data.findIndex(item => item.id == props.id);
                data.splice(targetIndex, 1);
            }
            localStorage.setItem('watchListMovies', JSON.stringify(data));
            setWatchListMovies([...data]);
        } else {
            let data: CarosuelCardProps[] = JSON.parse(localStorage.getItem('watchListTvShows') || '[]');
            const isTvShowFound = data.find(item => item.id == props.id);
            if (!isTvShowFound) {
                data.push({
                    original_name: props.original_name,
                    poster_path: props.backdrop_path,
                    id: props.id,
                    title: props.title,
                    overview: props.overview,
                    release_date: props.release_date,
                    vote_average: props.vote_average,
                    first_air_date: props.first_air_date,
                    type: type
                });
            } else {
                const targetIndex = data.findIndex(item => item.id == props.id);
                data.splice(targetIndex, 1);
            }
            localStorage.setItem('watchListTvShows', JSON.stringify(data));
            setWatchListTvshows([...data]);
        }
    }

    return (
        <>
            <Button variant="contained"
                sx={{
                    textTransform: 'capitalize',
                    bgcolor: { xs: 'rgb(16, 15, 15)', md: 'rgb(16, 15, 15)', lg: 'rgba(162, 255, 0, .06)' },
                    fontFamily: 'Rubik',
                    fontSize: 12,
                    fontWeight: '400',
                    height: 45,
                    border: '1px solid rgba(162, 255, 0, .3)',
                    borderRadius: 2,
                    color: 'white'
                }}
                onClick={() => { manageWatchList(type, props) }}>
                {type == "movie" ? (
                    watchListMovies.find(item => item.id === props.id) ?
                        <> <BookmarkIcon sx={{ mr: .75, scale: .75, fill: '#a2ff00' }} /> Remove from watch list </>
                        :
                        <> <BookmarkBorderOutlinedIcon sx={{ mr: .75, scale: .75, fill: '#a2ff00' }} /> Add to watch list </>
                ) : (
                    watchListTvshows.find(item => item.id === props.id) ?
                        <> <BookmarkIcon sx={{ mr: .75, scale: .75, fill: '#a2ff00' }} /> Remove from watch list </>
                        :
                        <> <BookmarkBorderOutlinedIcon sx={{ mr: .75, scale: .75, fill: '#a2ff00' }} /> Add to watch list </>
                )}

            </Button>
        </>
    )
}

export default WatchListSelection