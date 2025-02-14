import React from "react";
import Carousel from "react-multi-carousel";

// MUI
import { Typography, Box } from "@mui/material";

// stylesheet
import "react-multi-carousel/lib/styles.css";

// carousel config
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 6
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

// props
import { MoviesProps } from "../interfaces/props";

interface MovieCarouselProps {
    title: string
    trendingMovies: MoviesProps[],
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ trendingMovies, title }) => {
    return (
        <>
            {/* main title */}
            <Typography
                sx={{
                    fontWeight: 450,
                    fontFamily: 'Rubik',
                    color: 'white',
                    fontSize: 28,
                }}>
                {title}</Typography>

            <Box sx={{ mt: 2.5 }}>
                <Carousel responsive={responsive}>
                    {trendingMovies.map((item, index) => (
                        <div key={index}>
                            <Box sx={{ background: 'none', pl: .5, pr: .5 }}>
                                <img style={{ width: '100%', borderRadius: 10 }} src={item.poster_path} alt="" />
                                {/* movie title */}
                                <Box sx={{ mt: 1 }}>
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontSize: 22,
                                            fontWeight: 400,
                                            fontFamily: 'Rubik',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                        {item.title}</Typography>
                                </Box>
                            </Box>
                        </div>
                    ))}
                </Carousel>
            </Box>
        </>
    )
}

export default MovieCarousel;