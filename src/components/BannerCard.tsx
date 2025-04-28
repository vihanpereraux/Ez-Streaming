import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

// MUI
import {
    Box,
    Typography
} from "@mui/material";

// props
import { BannerCardProps } from "../interfaces/props";

const BannerCard: React.FC<BannerCardProps> = ({
    poster_path,
    original_name,
    first_air_date,
    vote_average,
    id }) => {

    const navigate = useNavigate();
    const navigateToTvScreen = () => {
        const data = {
            id: id.toString(),
        };
        const queryString = new URLSearchParams(data).toString();
        // send user
        navigate(`/screen/tv?${queryString}`);
    }

    return (
        <>
            <div
                style={{
                    background: 'none',
                    position: 'relative',
                    height: '50vw',
                    width: '100%'
                }}
                onClick={navigateToTvScreen}>
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
                            fontSize: { xs: '20px', lg: '30px' },
                            fontFamily: 'Rubik',
                            textTransform: 'capitalize',
                            fontWeight: { xs: '400', lg: '450' },
                            textAlign: 'center'
                        }}>{original_name}</Typography>

                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: { xs: '14px', lg: '15px' },
                            fontFamily: 'Rubik',
                            mt: 1.25,
                            textAlign: 'center',
                            fontWeight: 400
                        }}>
                        TV Series &nbsp;⋅
                        &nbsp;{first_air_date.slice(0, 4)} &nbsp;⋅
                        &nbsp;<FaStar style={{ color: '#a2ff00' }} />
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
            </div>
        </>
    )
}

export default BannerCard