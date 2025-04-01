import React from "react";
import Carousel from "react-multi-carousel";

// MUI 
import { Box } from "@mui/material";

// components
import BannerCard from "./BannerCard";

// carousel config 
import { bannerCarouselConfig } from "../config/CarouselConfig";

// props
import { MoviesProps } from "../interfaces/props";
interface BannerCarouselProps {
    content: MoviesProps[],
    type: string
}

const BannerCarosuel: React.FC<BannerCarouselProps>
    = ({ content, type }) => {
        return (
            <>
                <Box sx={{ mt: 2.5 }}>
                    <Carousel
                        autoPlay
                        infinite
                        autoPlaySpeed={3000}
                        responsive={bannerCarouselConfig}>

                        {content.map((item, index) => (
                            <div key={index} style={{ cursor: 'pointer' }}>
                                <BannerCard
                                    id={item.id}
                                    overview={item.overview}
                                    type={type}
                                    poster_path={type === "tv" ? item.backdrop_path : item.poster_path}
                                    original_name={item.original_name}
                                    first_air_date={item.first_air_date}
                                    vote_average={item.vote_average} />
                            </div>
                        ))}
                    </Carousel>
                </Box >
            </>
        )
    }

export default BannerCarosuel