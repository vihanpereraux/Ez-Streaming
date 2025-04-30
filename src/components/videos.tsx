import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { videoListConfig } from "../config/CarouselConfig";

// MUI
import { Typography, Box } from '@mui/material'

// props
interface props {
    videokeys: string[]
}
const Videos: React.FC<props> = ({ videokeys }) => {
    return (
        <>
            <Typography
                sx={{
                    fontWeight: 450,
                    fontFamily: 'Rubik',
                    color: 'white',
                    fontSize: { xs: '16px', lg: '18px' },
                }}>Trailers & Clips</Typography>

            <Box sx={{ mt: 2 }}>
                <Carousel responsive={videoListConfig}>
                    {videokeys.map((key, index) => (
                        <iframe
                            style={{
                                border: 'none',
                                outline: 'none',
                                borderRadius: 10
                            }}
                            key={index}
                            width={`97%`}
                            height={`300`}
                            src={`https://www.youtube.com/embed/${key}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    ))}
                </Carousel>
            </Box>
        </>
    )
}

export default Videos