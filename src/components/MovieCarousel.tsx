import React from "react";
import Carousel from "react-multi-carousel";
import { FaStar } from "react-icons/fa6";

// MUI
import { Typography, Box } from "@mui/material";

// components
import CarosuelCard from "./CarouselCard";

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
                            <CarosuelCard
                                poster_path={item.poster_path}
                                title={item.title}
                                release_date={item.release_date}
                                vote_average={item.vote_average} />
                        </div>
                    ))}
                </Carousel>
            </Box>
        </>
    )
}

export default MovieCarousel;