import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { videoListConfig } from "../config/carousel-config";

// MUI
import { Typography, Box } from '@mui/material'

// components
import IframePreview from "./iframe-preview";

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
                fontSize: { xs: 16, md: 15, lg: 15 },
            }}>Trailers & Clips</Typography>

            <Box sx={{ mt: 2 }}>
                {videokeys.length > 0 ? (
                    <Carousel responsive={videoListConfig}>
                        {videokeys.map((key, index) => (
                            <Box key={index}>
                                <IframePreview title={title} videoId={key} />

                            </Box>
                        ))}
                    </Carousel>
                ) : (
                    <Typography sx={{
                        fontSize: 13,
                        fontFamily: 'Rubik',
                        color: 'white',
                        opacity: .75,
                        textAlign: 'center',
                        mt: 5
                    }}>No trailers and clips available at the moment</Typography>
                )}
            </Box>
        </>
    )
}

export default Videos