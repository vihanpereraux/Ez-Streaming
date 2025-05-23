import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

// MUI
import { Box, Typography } from "@mui/material";

// props
import { CarosuelCardProps } from "../interfaces/props";

const CarosuelCard: React.FC<CarosuelCardProps>
    = ({ id, poster_path, title, first_air_date, release_date, vote_average, type, original_name }) => {
        const navigate = useNavigate();
        const [imageLoaded, setImageLoaded] = useState(false);

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
                    pr: .6,
                }}>
                    <Box className="_movie_poster_container"
                        style={{
                            overflow: 'hidden',
                            borderRadius: 12,
                            position: 'relative'
                        }}>
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
                                    justifyContent: 'center'
                                }}><div className="loading-spinner card-loading-spinner"></div>
                            </div>
                        )}
                        <img
                            loading="lazy"
                            className="_movie_poster_portrait"
                            onClick={navigateToScreen}
                            onLoad={() => setImageLoaded(true)}
                            style={{
                                width: '100%',
                                borderRadius: 12,
                                objectFit: 'cover',
                                aspectRatio: 3 / 4.5,
                                cursor: 'pointer',
                                opacity: imageLoaded ? 1 : 0,
                            }}
                            src={poster_path}
                            alt={title}
                        />
                    </Box>

                    {/* movie title */}
                    <Box sx={{ mt: 1.5 }}>
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
                                mb: .25,
                                maxWidth: '90%'
                            }}>{type === "movie" ? title : original_name}</Typography>

                        <Box sx={{
                            display: "inline-flex",
                            alignItems: "center",
                        }}>
                            <span style={{
                                color: 'white',
                                fontSize: 11,
                                fontWeight: 400,
                                fontFamily: 'Rubik',
                                opacity: .8
                            }}>{type === "movie" ? String(release_date).length > 0 ? String(release_date).slice(0, 4) : "--"
                                :
                                String(first_air_date).length > 0 ? String(first_air_date).slice(0, 4) : "--"}</span>

                            <span
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    color: "white",
                                    fontSize: 11,
                                    fontWeight: 400,
                                    fontFamily: "Rubik",
                                    opacity: 0.8,
                                    marginLeft: 15,
                                }}>
                                <FaStar style={{ color: "#a2ff00", marginRight: 5, fontSize: 11 }} />
                                {vote_average ? (Math.round(vote_average * 10) / 10) : "--"}
                            </span>
                        </Box>
                    </Box>
                </Box>
            </>
        )
    }

export default CarosuelCard;