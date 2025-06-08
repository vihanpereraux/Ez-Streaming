import React from "react";

// MUI
import { Typography, Box } from "@mui/material";

// components
import Carousel from "react-multi-carousel";
import CarosuelCard from "./carousel-card";

// stylesheet
import "react-multi-carousel/lib/styles.css";

// carousel config
import { movieCarouselConfig } from "../config/carousel-config";

// props
import { MoviesProps } from "../interfaces/props";
interface props {
    title?: string
    content: MoviesProps[],
    type: string
}

const MovieCarousel: React.FC<props> = ({ content, title, type }) => {
    return (
        <>
            {/* main title */}
            <Typography
                sx={{
                    fontWeight: 420,
                    fontFamily: 'Rubik',
                    color: 'white',
                    fontSize: { xs: 16, lg: 16 },
                }}>
                {title}</Typography>

            <Box sx={{ mt: 1.5 }}>
                <Carousel responsive={movieCarouselConfig} infinite={false} slidesToSlide={2}>
                    {content.map((item, index) => (
                        <div key={index}>
                            <div className="_carousel_card">
                                <CarosuelCard
                                    original_name={item.original_name}
                                    id={item.id}
                                    poster_path={item.poster_path}
                                    title={item.title}
                                    overview={item.overview}
                                    release_date={item.release_date}
                                    vote_average={item.vote_average}
                                    first_air_date={item.first_air_date}
                                    type={type} />
                            </div>
                        </div>
                    ))}
                </Carousel>
            </Box >
        </>
    )
}

export default MovieCarousel;