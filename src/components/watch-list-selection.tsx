import React from "react";

// MUI
import { Button } from "@mui/material";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

// props
import { CarosuelCardProps, WatchListSelectionProps } from "../interfaces/props";


const WatchListSelection: React.FC<WatchListSelectionProps> = ({ type, props }) => {
    const [watchListMovies, setWatchListMovies] = React.useState<CarosuelCardProps[]>(
        JSON.parse(localStorage.getItem('watchListMovies') || '[]')
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
        }
    }

    return (
        <>
            <Button variant="contained"
                sx={{
                    textTransform: 'capitalize',
                    bgcolor: { xs: 'rgb(16, 15, 15)', md: 'rgb(16, 15, 15)', lg: 'rgb(12, 12, 12)' },
                    fontFamily: 'Rubik',
                    fontSize: 12,
                    fontWeight: '400',
                    height: 42,
                    border: '1px solid rgba(162, 255, 0, .3)',
                    borderRadius: 1.85,
                    color: 'white'
                }}
                onClick={() => { manageWatchList(type, props) }}
            >   {watchListMovies.find(item => item.id === props.id) ?
                <> <BookmarkIcon sx={{ mr: .75, scale: .75, fill: '#a2ff00' }} /> Remove from watch list </>
                :
                <> <BookmarkBorderOutlinedIcon sx={{ mr: .75, scale: .75, fill: '#a2ff00' }} /> Add to watch list </>}
            </Button>
        </>
    )
}

export default WatchListSelection