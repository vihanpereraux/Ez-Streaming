import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { videoListConfig } from "../config/carousel-config";

// MUI
import { Typography, Box } from '@mui/material'

// props
interface props {
    title: string,
    videokeys: string[]
}
const Videos: React.FC<props> = ({ videokeys, title }) => {
    return (
        <>
            <Typography sx={{
                fontWeight: 420,
                fontFamily: 'Rubik',
                color: 'white',
                fontSize: { xs: 17, lg: 16 },
            }}>Trailers & Clips</Typography>

            <Box sx={{ mt: 2 }}>
                <Carousel responsive={videoListConfig}>
                    {videokeys.length > 0 ? videokeys.map((key, index) => (
                        <iframe
                            loading="lazy"
                            style={{
                                border: 'none',
                                outline: 'none',
                                borderRadius: 10,
                                aspectRatio: 16 / 9
                            }}
                            key={index}
                            width={window.innerWidth < 600 ? '100%' : '98%'}
                            src={`https://www.youtube.com/embed/${key}`}
                            title={`Clips from ${title}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    )) : (
                        <Typography sx={{
                            fontSize: 14,
                            fontFamily: 'Rubik',
                            color: 'white',
                            opacity: .75,
                            pl: 2
                        }}>No trailers and clips available</Typography>
                    )}
                </Carousel>
            </Box>
        </>
    )
}

export default Videos