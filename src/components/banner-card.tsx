import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

// MUI
import {
    Box,
    Typography
} from "@mui/material";

// props
import { BannerCardProps } from "../interfaces/props";

const BannerCard: React.FC<BannerCardProps> = ({ poster_path, original_name, first_air_date, vote_average, id }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const navigate = useNavigate();
    const navigateToTvScreen = () => {
        const data = { id: id.toString() };
        const queryString = new URLSearchParams(data).toString();
        // send user
        navigate(`/screen/tv?${queryString}`);
    }

    return (
        <>
            <Box sx={{
                background: 'none',
                position: 'relative',
                height: { xs: '100vw', sm: '50vw', md: '50vw', lg: '50vw' },
                width: '100%'
            }} onClick={navigateToTvScreen}>
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
                            fontSize: { xs: '18px', lg: '22px' },
                            fontFamily: 'Rubik',
                            textTransform: 'capitalize',
                            fontWeight: { xs: '400', lg: '420' },
                            textAlign: 'center'
                        }}>{original_name}</Typography>

                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: { xs: 12, lg: 12 },
                            fontFamily: 'Rubik',
                            mt: { xs: .85, lg: 1.2 },
                            textAlign: 'center',
                            fontWeight: 400
                        }}>
                        TV Show &nbsp;⋅
                        &nbsp;{first_air_date.slice(0, 4)} &nbsp;⋅
                        &nbsp;<FaStar style={{ color: '#a2ff00' }} />
                        &nbsp;&nbsp;{Math.round(vote_average * 10) / 10}</Typography>
                </div>

                {/* poster */}
                {!imageLoaded && (
                    <div className="loading-animation"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: '#1a1a1a',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 12,    
                        }}><div className="loading-spinner banner-loading-spinner"></div>
                    </div>
                )}
                <img
                    loading="lazy"
                    style={{
                        width: '100%',
                        borderRadius: 12,
                        objectFit: 'cover',
                        height: '100%',
                        opacity: imageLoaded ? 1 : 0,
                    }}
                    onLoad={() => setImageLoaded(true)}
                    src={poster_path} alt="" />

                {/* shader */}
                <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);',
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    borderRadius: 3
                }}></Box>
            </Box>
        </>
    )
}

export default BannerCard