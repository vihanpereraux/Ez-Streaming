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
    }) => {
        return (
            <>
                <Box sx={{
                    background: 'none',
                    position: 'relative',
                    height: '50vw',
                    width: '100%'
                }}>
                    {/* details */}
                    <div
                        className="_banner_details_wrapper"
                        style={{
                            position: 'absolute',
                            bottom: '8%',
                            left: '50%',
                            height: 'auto',
                            transform: 'translateX(-50%)',
                            zIndex: 2,
                            width: '100%'
                        }}>
                        <Typography
                        sx={{
                                color: 'white',
                                fontSize: 35,
                                fontFamily: 'Rubik',
                                textTransform: 'capitalize',
                                fontWeight: 500,
                                textAlign: 'center'
                            }}>{original_name}</Typography>

                        <Typography
                            sx={{
                                color: 'white',
                                fontSize: 17,
                                fontFamily: 'Rubik',
                                mt: 1,
                                textAlign: 'center'
                            }}>
                            TV Series &nbsp;⋅
                            &nbsp;{first_air_date.slice(0, 4)} &nbsp;⋅
                            &nbsp;<FaStar style={{ color: 'orange' }} />
                            &nbsp;&nbsp;{Math.round(vote_average * 10) / 10}</Typography>
                    </div>

                    {/* poster */}
                    <img
                        style={{
                            width: '100%',
                            borderRadius: 16,
                            objectFit: 'cover',
                            height: '100%'
                        }}
                        src={poster_path} alt="" />

                    {/* shader */}
                    <Box sx={{
                        position: 'absolute',
                        bottom: 0,
                        background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);',
                        width: '100%',
                        height: '100%',
                        zIndex: 1,
                        borderRadius: 4
                    }}  ></Box>
                </Box>
            </>
        )
    }

export default BannerCard