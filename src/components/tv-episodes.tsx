import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { tvEpisodeCarouselConfig } from "../config/CarouselConfig";

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
                        fontWeight: 450,
                        fontFamily: 'Rubik',
                        color: 'white',
                        fontSize: { xs: '16px', lg: '18px' },
                    }} component="span">Seasons & Episodes &nbsp; <span style={{ opacity: .7, fontSize: 15 }}>({seasonDetails.length.toString()} Seasons)</span></Typography>
                </AccordionSummary>

                <AccordionDetails sx={{
                    background: 'rgba(0, 0, 0, 0.25)',
                    borderRadius: 3,
                    pt: 2
                }}>
                    {/* selection */}
                    {seasonDetails.map((detail, index) => (
                        <Box key={index} sx={{ mt: 3 }}>
                            {/* title */}
                            <Typography sx={{
                                color: 'white',
                                fontSize: 15,
                                fontFamily: 'Rubik',
                                mb: 2,
                            }}>Season {detail.season} &nbsp; ⋅ &nbsp;<span style={{ opacity: .65 }}>{detail.numOfEpisodes} Episodes</span></Typography>

                            {/* selection */}
                            <Carousel responsive={tvEpisodeCarouselConfig} slidesToSlide={5}>
                                {detail.numOfEpisodes == 0 ? (
                                    <Typography sx={{
                                        color: 'white',
                                        fontSize: 14,
                                        opacity: .5,
                                        fontWeight: 450
                                    }}>No episodes yet</Typography>
                                ) : (
                                    Array.from({ length: detail.numOfEpisodes }, (_, index) => (
                                        <Box key={index}
                                            sx={{
                                                cursor: 'pointer',
                                                textAlign: 'center',
                                                textTransform: 'capitalize',
                                                backgroundColor: 'rgba(0, 0, 0, .5)',
                                                pt: 0,
                                                pb: 1.5,
                                                fontSize: 14,
                                                fontFamily: 'Rubik',
                                                fontWeight: 400,
                                                width: '90%',
                                                borderRadius: 2,
                                                border: userSelection.season == detail.season && userSelection.episodeNumber == index + 1 ?
                                                    "2px solid rgba(162, 255, 0, .35)"
                                                    :
                                                    "1px solid rgba(162, 255, 0, 0)",
                                            }}
                                            onClick={() => { manageUserSelection(detail.season, (index + 1)) }}>

                                            {/* still image */}
                                            <img
                                                style={{
                                                    width: '100%',
                                                    aspectRatio: '16/9',
                                                    objectFit: 'cover',
                                                    borderRadius: 8,
                                                }}
                                                src={detail.episodeDetails.stills[index] ? `https://image.tmdb.org/t/p/w300/${detail.episodeDetails.stills[index]}` : `https://i.ibb.co/1YCDW7pR/tv-not-availabe-yet.jpg`}
                                                alt={`Preview for episode ${index + 1} in season ${detail.season}`} />

                                            {/* episode number */}
                                            <Typography sx={{
                                                fontSize: 13,
                                                mt: 1,
                                                fontWeight: 400,
                                                fontFamily: 'Rubik',
                                                color: userSelection.season == detail.season && userSelection.episodeNumber == index + 1 ?
                                                    "#a2ff00"
                                                    :
                                                    "white",
                                            }}>Episode {index + 1}</Typography>

                                            {/* episode name */}
                                            <Typography sx={{
                                                fontSize: 12,
                                                mt: .5,
                                                fontFamily: 'Rubik',
                                                opacity: .6,
                                                color: "white"
                                            }}>{detail.episodeDetails.names[index] === `Episode ${index + 1}` ? `Not availabe` : detail.episodeDetails.names[index]}</Typography>

                                            {/* episode name */}
                                            <Typography sx={{
                                                fontSize: 10,
                                                mt: .85,
                                                fontFamily: 'Rubik',
                                                opacity: .45,
                                                color: "white"
                                            }}>{detail.episodeDetails.airDates[index] ? detail.episodeDetails.airDates[index] : "--"}</Typography>
                                        </Box>
                                    ))
                                )}
                            </Carousel>
                        </Box>
                    ))}
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default TvEpisodes