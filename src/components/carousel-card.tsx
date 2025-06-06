import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

// MUI
import { Box, Typography } from "@mui/material";

// props
import { CarosuelCardProps } from "../interfaces/props";

const CarosuelCard: React.FC<CarosuelCardProps> = ({ id, poster_path, title, first_air_date, release_date, vote_average, type, original_name }) => {
    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false);

    const navigateToScreen = () => {
        if (type === 'movie') {
            navigate(`/screen/movie?id=${id}`);
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
                pl: .4,
                pr: .4,
            }}>
                <Box className={type == "movie" ? "_movie_poster_container" : "_tv_poster_container"}
                    style={{
                        overflow: 'hidden',
                        borderRadius: 12,
                        position: 'relative',
                    }}>
                    {!imageLoaded && (
                        <Box style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: '#1a1a1a',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}><Box className="loading-spinner card-loading-spinner"></Box>
                        </Box>
                    )}
                    <img
                        loading="lazy"
                        className="_movie_poster_portrait"
                        onClick={navigateToScreen}
                        onLoad={() => setImageLoaded(true)}
                        style={{
                            width: '100%',
                            borderRadius: 8,
                            objectFit: 'cover',
                            aspectRatio: type == "movie" ? (3 / 4.5) : (16 / 10),
                            cursor: 'pointer',
                            opacity: imageLoaded ? 1 : 0,
                        }}
                        src={poster_path}
                        alt={title}
                    />
                </Box>

                {/* title */}
                <Box sx={{
                    mt: 1.75,
                    alignItems: 'flex-end',
                }}>
                    <Typography
                        className="_movie_title"
                        sx={{
                            color: 'white',
                            fontSize: { xs: 14, md: 14, lg: 14 },
                            fontWeight: 400,
                            fontFamily: 'Rubik',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '90%',
                            mb: -.15
                        }}>{type === "movie" ? title : original_name}</Typography>

                    <Box sx={{
                        // mt: .1,
                        display: "inline-flex",
                        alignItems: "center",
                    }}>
                        <Typography sx={{
                            color: 'white',
                            fontSize: 11.5,
                            fontWeight: 400,
                            fontFamily: 'Rubik',
                            opacity: .8
                        }}>{type === "movie" ? String(release_date).length > 0 ? String(release_date).slice(0, 4) : "--"
                            :
                            String(first_air_date).length > 0 ? String(first_air_date).slice(0, 4) : "--"}
                            &nbsp; ·
                        </Typography>

                        <Typography sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            color: "white",
                            fontSize: 11.5,
                            fontWeight: 400,
                            fontFamily: "Rubik",
                            opacity: 0.8,
                        }}>
                            &nbsp;&nbsp; <FaStar style={{ color: "#a2ff00", marginRight: 5, fontSize: 11 }} />
                            <span style={{ letterSpacing: 2 }}>{vote_average ? (Math.round(vote_average * 10) / 10) : "--"}</span>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default CarosuelCard;