import React, { useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { tvEpisodeCarouselConfig } from "../config/carousel-config";
import Lottie from "lottie-react";
import nowStreamingIcon from "../../public/icons/now-playing-icon.json";

// MUI
import { Box, Typography } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// props
import { SeasonProps } from '../interfaces/props';
interface UserSelectionProps {
    season: number,
    episodeNumber: number
}
interface props {
    seasonDetails: SeasonProps[],
    setUserSelection: (snaphot: UserSelectionProps) => void,
    userSelection: UserSelectionProps
}


const TvEpisodes: React.FC<props> = ({ seasonDetails, userSelection, setUserSelection }) => {
    const [isThumbnailLoaded, setIsThumbnailLoaded] = useState<boolean>(false);
    const manageUserSelection = (season: number, episodeNumber: number) => {
        const snapshot: UserSelectionProps = {
            season: season,
            episodeNumber: episodeNumber
        };
        setUserSelection({ ...snapshot });
    }

    return (
        <>
            <Accordion
                defaultExpanded={true}
                sx={{
                    background: 'rgba(0, 0, 0, 0)',
                    color: 'white',
                }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header">
                    <Typography sx={{
                        ml: -2,
                        fontWeight: 400,
                        fontFamily: 'Rubik',
                        color: 'white',
                        fontSize: { xs: 16, md: 15, lg: 15 },
                    }} component="span">Seasons & Episodes &nbsp;·&nbsp; <span style={{ opacity: .7, fontSize: 15 }}>{seasonDetails.length.toString()} Seasons</span></Typography>
                </AccordionSummary>

                <AccordionDetails sx={{
                    background: 'rgba(0, 0, 0, 0.25)',
                    borderRadius: 3,
                    pt: 0,
                    pl: 0,
                    pr: 0,
                }}>
                    <Box sx={{ mt: -2 }}>
                        {/* selection */}
                        {seasonDetails.map((detail, index) => (
                            <Box key={index} sx={{ mt: 2.55 }}>
                                {/* title */}
                                <Typography sx={{
                                    color: 'white',
                                    fontSize: 13,
                                    fontFamily: 'Rubik',
                                    mb: 2,
                                }}>Season {detail.season} &nbsp; ⋅ &nbsp;<span style={{ opacity: .65 }}>{detail.numOfEpisodes} Episodes</span></Typography>

                                {/* selection */}
                                <Carousel
                                    responsive={tvEpisodeCarouselConfig}
                                    slidesToSlide={window.innerWidth > 1024 ? 5 : 1}>
                                    {detail.numOfEpisodes == 0 ? (
                                        <Typography sx={{
                                            color: 'white',
                                            fontSize: 14,
                                            opacity: .5,
                                            fontWeight: 450
                                        }}>No episodes yet</Typography>
                                    ) : (
                                        Array.from({ length: detail.numOfEpisodes }, (_, index) => (
                                            <Box key={index} onClick={() => { manageUserSelection(detail.season, (index + 1)) }}>
                                                {/* still image */}
                                                <Box sx={{
                                                    width: '98.25%',
                                                    position: 'relative',
                                                    aspectRatio: 16 / 10,
                                                    cursor: 'pointer'
                                                }}>
                                                    {!isThumbnailLoaded && (
                                                        <Box style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            width: '100%',
                                                            aspectRatio: 16 / 10,
                                                            background: '#1a1a1a',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: 8,
                                                        }}><Box className="loading-spinner card-loading-spinner"></Box>
                                                        </Box>
                                                    )}
                                                    {/* shader */}
                                                    <Box sx={{
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                        background: 'linear-gradient(to top, rgba(0,0,0,.95) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0) 70%, rgba(0,0,0,.60) 100%)',
                                                        zIndex: 1,
                                                    }}></Box>
                                                    <img
                                                        style={{
                                                            position: 'absolute',
                                                            left: 0,
                                                            top: 0,
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            borderRadius: 6,
                                                            opacity: isThumbnailLoaded ? 1 : 0,
                                                            zIndex: 0
                                                        }}
                                                        onLoad={() => { setIsThumbnailLoaded(true); }}
                                                        src={detail.episodeDetails.stills[index] ? `https://image.tmdb.org/t/p/w300/${detail.episodeDetails.stills[index]}` : `https://i.ibb.co/1YCDW7pR/tv-not-availabe-yet.jpg`}
                                                        alt={`Preview for episode ${index + 1} in season ${detail.season}`} />

                                                    {/* current epiosde indicator */}
                                                    {userSelection.season == detail.season && userSelection.episodeNumber == index + 1 && (
                                                        <Box sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            position: 'absolute',
                                                            left: 5,
                                                            top: 0,
                                                            zIndex: 2
                                                        }}>
                                                            <Lottie style={{ width: 25, paddingTop: 5 }} animationData={nowStreamingIcon} loop={true} />
                                                            <Typography
                                                                sx={{
                                                                    color: 'white',
                                                                    textTransform: 'capitalize',
                                                                    fontSize: { xs: 10, lg: 10 },
                                                                    fontWeight: { xs: 450, lg: 450 },
                                                                    fontFamily: 'Rubik',
                                                                    ml: .35,
                                                                    opacity: .9
                                                                }}>Now watching
                                                            </Typography>
                                                        </Box>
                                                    )}

                                                    {/* meta details */}
                                                    <Box sx={{
                                                        position: 'absolute',
                                                        width: '100%',
                                                        bottom: 0,
                                                        left: 0,
                                                        zIndex: 2,
                                                        pl: 1.25,
                                                        pb: 1.55
                                                    }}>
                                                        {/* episode number */}
                                                        <Typography sx={{
                                                            fontSize: 9,
                                                            fontFamily: 'Rubik',
                                                            opacity: .85,
                                                            color: "white",
                                                            fontWeight: 400,
                                                        }}> SS {detail.season < 10 ? `0${detail.season}` : detail.season} &nbsp;⋅&nbsp;
                                                            EP {detail.episodeDetails.names[index] === `${index + 1}` ?
                                                                `${index + 1}` :
                                                                index + 1 < 10 ? `0${index + 1}` : (index + 1)}
                                                            &nbsp; ⋅&nbsp; {detail.episodeDetails.airDates[index] ? detail.episodeDetails.airDates[index] : "--"} &nbsp;
                                                        </Typography>

                                                        {/* episode name */}
                                                        <Typography sx={{
                                                            fontSize: { xs: 12, lg: 11 },
                                                            fontFamily: 'Rubik',
                                                            opacity: 1,
                                                            fontWeight: 420,
                                                            color: userSelection.season == detail.season && userSelection.episodeNumber == index + 1 ? "#a2ff00" : "white",
                                                            mt: .25
                                                        }}>{detail.episodeDetails.names[index] === `Episode ${index + 1}` ? `Episode ${index + 1}` : detail.episodeDetails.names[index]}</Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        ))
                                    )}
                                </Carousel>
                            </Box>
                        ))}
                    </Box>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default TvEpisodes