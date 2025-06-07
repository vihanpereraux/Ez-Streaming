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
            <Box sx={{ background: 'none', pl: .4, pr: .4, position: 'relative' }}>
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
                        className="poster"
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
                        alt={title} />
                </Box>

                {/* metadata */}
                <Box sx={{
                    mt: 1.75,
                    alignItems: 'flex-end',
                }}>
                    {/* title */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Typography
                            className="_movie_title"
                            sx={{
                                color: 'white',
                                fontSize: { xs: 13, md: 14, lg: 14 },
                                fontWeight: 400,
                                fontFamily: 'Rubik',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '70%',
                                mb: -.25
                            }}>{type === "movie" ? title : original_name}</Typography>

                        <Typography sx={{
                            color: '#a2ff00',
                            fontSize: { xs: 11, lg: 11 },
                            fontWeight: 420,
                            fontFamily: 'Rubik',
                            opacity: .9,
                            mr: 1.5,
                            textTransform: 'capitalize'
                        }}>{type == "movie" ? "movie" : "TV Show"}</Typography>
                    </Box>

                    <Box sx={{
                        display: "inline-flex",
                        alignItems: "center",
                    }}>
                        <Typography sx={{
                            color: 'white',
                            fontSize: { xs: 10, lg: 11.5 },
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
                            fontSize: {xs: 10, lg: 11},
                            fontWeight: 400,
                            fontFamily: "Rubik",
                            opacity: 0.8,
                        }}>
                            &nbsp;&nbsp; <FaStar style={{ color: "#a2ff00", marginRight: 5, fontSize: 11 }} />
                            <span style={{ letterSpacing: 2 }}>{vote_average ? (Math.round(vote_average * 10) / 10) : "--"}</span>
                        </Typography>
                    </Box>
                </Box>

                {/* tag */}
                <Box sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    pointerEvents: 'none',
                    zIndex: 2,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,.85) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0) 100%)',
                }}>
                    <Box sx={{ display: 'flex', pl: 1.65, pt: 1.75, pb: 5, alignItems: 'center' }}>
                        <Box sx={{
                            height: 20,
                            width: 2.25,
                            bgcolor: '#a2ff00',
                            mr: .75,
                            borderRadius: 10,
                        }}></Box>
                        <Typography
                            sx={{
                                color: 'white',
                                textTransform: 'capitalize',
                                fontSize: { xs: 9, lg: 9.5 },
                                fontWeight: { xs: 450, lg: 420 },
                                fontFamily: 'Rubik',
                                lineHeight: 1.25,
                                opacity: .9
                            }}>Watch now <br /> on Ez Streaming
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default CarosuelCard;