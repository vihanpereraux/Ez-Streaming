import React from "react";
import Carousel from "react-multi-carousel";

// MUI
import { Typography, Box } from "@mui/material";

// components
import CarosuelCard from "./CarouselCard";

// stylesheet
import "react-multi-carousel/lib/styles.css";

// carousel config
import { multiCarouselConfig } from "../config/CarouselConfig";

// props
import { MoviesProps } from "../interfaces/props";

interface MovieCarouselProps {
    title?: string
    content: MoviesProps[],
    type: string
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ content, title }) => {
    return (
        <>
            {/* main title */}
            <Typography
                sx={{
                    fontWeight: 450,
                    fontFamily: 'Rubik',
                    color: 'white',
                    fontSize: 22,
                }}>
                {title}</Typography>

            <Box sx={{ mt: 2.5 }}>
                <Carousel responsive={multiCarouselConfig}>
                    {content.map((item, index) => (
                        <div key={index}>
                            <div className="_carousel_card">
                                <CarosuelCard
                                    id={item.id}
                                    poster_path={item.poster_path}
                                    title={item.title}
                                    overview={item.overview}
                                    release_date={item.release_date}
                                    vote_average={item.vote_average} type="" />
                            </div>
                        </div>
                    ))}
                </Carousel>
            </Box >
        </>
    )
}

export default MovieCarousel;