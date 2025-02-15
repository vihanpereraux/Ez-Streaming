import React from "react";
import Carousel from "react-multi-carousel";
import { FaStar } from "react-icons/fa6";

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
                                <img
                                    style={{
                                        width: '100%',
                                        borderRadius: 10,
                                        aspectRatio: '9/16',
                                        objectFit: 'cover',
                                        height: '500px'
                                    }}
                                    src={item.poster_path} alt="" />
                                {/* movie title */}
                                <Box sx={{ mt: 1.5 }}>
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontSize: 22,
                                            fontWeight: 400,
                                            fontFamily: 'Rubik',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            mb: .66
                                        }}>
                                        {item.title}</Typography>

                                    <span style={{
                                        color: 'white',
                                        fontSize: 18,
                                        fontWeight: 400,
                                        fontFamily: 'Rubik',
                                        opacity: .8
                                    }}>{(item.release_date).slice(0, 4)}</span>

                                    <span style={{
                                        color: 'white',
                                        fontSize: 18,
                                        fontWeight: 400,
                                        fontFamily: 'Rubik',
                                        opacity: .8,
                                        marginLeft: 20
                                    }}>
                                        <FaStar style={{ color: 'orange' }} />  {Math.round(item.vote_average * 10) / 10}</span>
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