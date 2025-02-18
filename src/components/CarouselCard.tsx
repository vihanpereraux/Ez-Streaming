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

const CarosuelCard: React.FC<CarosuelCardProps>
    = ({ id, poster_path, title, release_date, vote_average, overview }) => {
        const navigate = useNavigate();

        const navigateToScreen = () => {
            const data = {
                id: id,
                title: title,
                overview: overview,
                release_date: release_date,
                vote_average: vote_average,
            };
            navigate('/screen', { state: { data } });
        }

        return (
            <>
                <Box
                    sx={{
                        background: 'none',
                        pl: .5,
                        pr: .5
                    }}>
                    {/* poster */}
                    <img
                        onClick={navigateToScreen}
                        style={{
                            width: '100%',
                            borderRadius: 10,
                            objectFit: 'cover',
                            height: '500px',
                            cursor: 'pointer'
                        }}
                        src={poster_path} alt="" />

                    {/* movie title */}
                    <Box sx={{ mt: 1.5 }}>
                        <Typography
                            sx={{
                                color: 'white',
                                fontSize: 22,
                                fontWeight: 400,
                                fontFamily: 'Rubik',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                mb: .66
                            }}>
                            {title}</Typography>

                        <span style={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: 400,
                            fontFamily: 'Rubik',
                            opacity: .8
                        }}>{release_date ? (release_date).slice(0, 4) : null}</span>

                        <span style={{
                            color: 'white',
                            fontSize: 18,
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

export default CarosuelCard;