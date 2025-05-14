import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

// MUI
import {
    Box,
    Typography
} from "@mui/material";

// props
import { CarosuelCardProps } from "../interfaces/props";

const WatchedCard: React.FC<CarosuelCardProps>
    = ({
        id,
        poster_path,
        title,
        first_air_date,
        release_date,
        vote_average,
        type,
        original_name }) => {
        const navigate = useNavigate();

        const navigateToScreen = () => {
            if (type === "movie") {
                const data = { id: id.toString() };
                const queryString = new URLSearchParams(data).toString();
                navigate(`/screen/movie?${queryString}`);
            }
            else {
                const data = { id: id.toString() };
                const queryString = new URLSearchParams(data).toString();
                navigate(`/screen/tv?${queryString}`);
            }
        }

        return (
            <>
                <Box sx={{
                    background: 'none',
                    pl: .6,
                    pr: .6
                }}>
                    {/* poster */}
                    <img
                        loading="lazy"
                        className="_movie_poster_portrait"
                        onClick={navigateToScreen}
                        style={{
                            width: '100%',
                            borderRadius: 15,
                            objectFit: 'cover',
                            height: '24vw',
                            cursor: 'pointer'
                        }}
                        src={poster_path} alt={title} />

                    {/* movie title and meta data */}
                    <Box>
                        <Typography
                            className="_movie_title"
                            sx={{
                                color: 'white',
                                fontSize: { xs: 14, md: 14, lg: 15 },
                                fontWeight: 400,
                                fontFamily: 'Rubik',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                mb: .5,
                                mt: 1.5,
                                maxWidth: '90%'
                            }}>{type === "movie" ? title : original_name}</Typography>

                        <span style={{
                            color: 'white',
                            fontSize: 13,
                            fontWeight: 400,
                            fontFamily: 'Rubik',
                            opacity: .8
                        }}>{type === "movie" ?
                            String(release_date).slice(0, 4)
                            :
                            String(first_air_date).slice(0, 4)}</span>

                        <span style={{
                            color: 'white',
                            fontSize: 13,
                            fontWeight: 400,
                            fontFamily: 'Rubik',
                            opacity: .8,
                            marginLeft: 15
                        }}>
                            <FaStar style={{ color: '#a2ff00' }} />  {Math.round(vote_average * 10) / 10}</span>
                    </Box>
                </Box>
            </>
        )
    }

export default WatchedCard;