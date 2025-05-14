import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

// MUI
import {
    Box,
    Typography
} from "@mui/material";

// props
import { SearchCardProps } from "../interfaces/props";

const SearchCard: React.FC<SearchCardProps>
    = ({ id,
        poster_path,
        title,
        release_date,
        first_air_date,
        vote_average,
        type }) => {
        const navigate = useNavigate();

        const navigateToScreen = () => {
            if (type === "movie") {
                const data = { id: id.toString() };
                const queryString = new URLSearchParams(data).toString();
                // send user
                navigate(`/screen/movie?${queryString}`);
            }
            else {
                const data = { id: id.toString() };
                const queryString = new URLSearchParams(data).toString();
                // send user
                navigate(`/screen/tv?${queryString}`);
            }
        }

        return (
            <>
                <Box sx={{
                    background: 'none',
                    pl: .6,
                    pr: .6,
                }}>
                    {/* poster */}
                    <div className="search_results_poster_container"
                        style={{ overflow: 'hidden', borderRadius: 15 }}>
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
                    </div>

                    {/* movie title */}
                    <Box sx={{ mt: 1.5 }}>
                        <Typography
                            className="_movie_title"
                            sx={{
                                color: 'white',
                                fontSize: 16,
                                fontWeight: 450,
                                fontFamily: 'Rubik',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                mb: .7,
                                maxWidth: '90%'
                            }}>
                            {title}</Typography>

                        <span style={{
                            color: 'white',
                            fontSize: 14,
                            fontWeight: 400,
                            fontFamily: 'Rubik',
                            opacity: .8
                        }}>{type === 'movie' ? release_date.slice(0, 4) : (String(first_air_date)).slice(0, 4)}</span>

                        <span style={{
                            color: 'white',
                            fontSize: 14,
                            fontWeight: 400,
                            fontFamily: 'Rubik',
                            opacity: .8,
                            marginLeft: 20
                        }}>
                            <FaStar style={{ color: 'orange' }} />  {Math.round(vote_average * 10) / 10}</span>
                    </Box>
                </Box>
            </>
        )
    }

export default SearchCard;