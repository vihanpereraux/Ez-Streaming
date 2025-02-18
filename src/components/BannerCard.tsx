import React from "react";
import { FaStar } from "react-icons/fa6";

// MUI
import {
    Box,
    Typography
} from "@mui/material";

// props
import { BannerCardProps } from "../interfaces/props";

const BannerCard: React.FC<BannerCardProps>
    = ({
        poster_path,
        original_name,
        first_air_date,
        vote_average,
        type
    }) => {
        return (
            <>
                <Box sx={{
                    background: 'none',
                    position: 'relative',
                    height: '800px'
                }}>
                    {/* details */}
                    <Box sx={{
                        position: 'absolute',
                        bottom: '6%',
                        left: '3%',
                        // background: 'darkblue',
                        width: '50%',
                        height: 'auto'
                    }}>
                        <Typography
                            sx={{
                                color: 'white',
                                fontSize: 50,
                                fontFamily: 'Rubik',
                                textTransform: 'capitalize',
                                fontWeight: 500
                            }}>{original_name}</Typography>

                        <Typography
                            sx={{
                                color: 'white',
                                fontSize: 22,
                                fontFamily: 'Rubik',
                                mt: 1,
                            }}>
                            TV Series &nbsp;⋅
                            &nbsp;{first_air_date.slice(0, 4)} &nbsp;⋅
                            &nbsp;<FaStar style={{ color: 'orange' }} />
                            &nbsp;&nbsp;{Math.round(vote_average * 10) / 10}</Typography>
                    </Box>

                    {/* poster */}
                    <img
                        style={{
                            width: '100%',
                            borderRadius: 16,
                            objectFit: 'cover',
                            height: type === "banner" ? '800px' : '500px'
                        }}
                        src={poster_path} alt="" />
                </Box>
            </>
        )
    }

export default BannerCard