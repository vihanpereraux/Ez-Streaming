import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
// MUI
import { Box, Typography } from "@mui/material";

// components
import MovieCarousel from "../components/MovieCarousel";

// services
import { getRelatedTVShows } from "../services/Api";

// props
import {
    MoviesProps,
    ScreenNavigationProps
} from "../interfaces/props";

const TvScreen: React.FC = () => {
    const [relatedContent, setRelatedContent] = useState<MoviesProps[]>([])

    // movie props (nav)
    const location = useLocation();
    const props: ScreenNavigationProps = location.state?.data || {};

    const relatedTVLocalArr: MoviesProps[] = []
    const getRelatedContent = async () => {
        const content = await getRelatedTVShows(relatedTVLocalArr, props.id);
        if (content) { setRelatedContent([...content]); }
    }

    useEffect(() => {
        getRelatedContent();
    }, [props.id])

    return (
        <>
            <Box sx={{ pt: 15, pl: 6, pr: 6 }}>
                <Box sx={{ display: "flex" }}>
                    <Box sx={{ width: '60%' }}>
                        <iframe
                            allowFullScreen={true}
                            style={{
                                width: '100%',
                                aspectRatio: '16/9',
                                border: 'none',
                                borderRadius: 12,
                            }}
                            src={`https://vidsrc.xyz/embed/tv/${props.id}`}></iframe>
                    </Box>
                    {/* details */}
                    <Box sx={{ width: '40%', pl: 3.5 }}>
                        <Typography
                            sx={{
                                color: 'white',
                                textAlign: 'left',
                                fontSize: 25,
                                fontFamily: 'Rubik',
                                fontWeight: 450,
                                mb: 1
                            }}>{props.title}</Typography>

                        {/* other details */}
                        <span style={{
                            color: 'white',
                            fontSize: 16,
                        }}>
                            {(props.first_air_date).slice(0, 4)} &nbsp;&nbsp;
                            <FaStar style={{ color: 'orange' }} /> &nbsp;{Math.round(props.vote_average * 10) / 10}</span>

                        <Typography
                            sx={{
                                fontFamily: 'Rubik',
                                fontSize: 16,
                                lineHeight: 1.6,
                                fontWeight: 400,
                                mt: 3,
                                color: 'white'
                            }}>{props.overview}</Typography>
                    </Box>
                </Box>

                {/* related content */}
                {relatedContent.length > 0 ? (
                    <Box sx={{ mt: 8 }}>
                        <MovieCarousel
                            type="tv"
                            title="TV Shows You May Enjoy"
                            content={relatedContent} />
                    </Box>
                ) : (
                    <div>
                        <Typography
                            sx={{
                                fontWeight: 450,
                                fontFamily: 'Rubik',
                                color: 'white',
                                fontSize: 22,
                                mt: 8
                            }}>
                            No related tv shows found &nbsp; : (</Typography>
                    </div>
                )}

            </Box>
        </>
    )
}

export default TvScreen;