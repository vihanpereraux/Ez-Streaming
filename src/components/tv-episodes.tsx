import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { tvEpisodeCarouselConfig } from "../config/CarouselConfig";

// MUI
import { Box, Typography, Button } from "@mui/material";
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
                defaultExpanded={false}
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
                    }} component="span">Seasons & Episodes &nbsp; <span style={{ opacity: .7, fontSize : 15 }}>({seasonDetails.length.toString()} Seasons)</span></Typography>
                </AccordionSummary>

                <AccordionDetails sx={{
                    background: 'rgba(0, 0, 0, 0.25)',
                    borderRadius: 3,
                    pt: 2
                }}>
                    {/* selection */}
                    {seasonDetails.map((details, index) => (
                        <Box key={index} sx={{ mt: 3 }}>
                            {/* title */}
                            <Typography sx={{
                                color: 'white',
                                fontSize: 15,
                                fontFamily: 'Rubik',
                                mb: 2,
                            }}>Season {details.season} &nbsp; ⋅ <span style={{ opacity: .65 }}>{details.numOfEpisodes} Episodes</span></Typography>

                            {/* selection */}
                            <Carousel responsive={tvEpisodeCarouselConfig}>
                                {details.numOfEpisodes == 0 ? (
                                    <Typography sx={{
                                        color: 'white',
                                        fontSize: 14,
                                        opacity: .5,
                                        fontWeight: 450
                                    }}>No episodes yet</Typography>
                                ) : (
                                    Array.from({ length: details.numOfEpisodes }, (_, index) => (
                                        <Button key={index}
                                            sx={{
                                                color: userSelection.season == details.season && userSelection.episodeNumber == index + 1 ? "rgb(162, 255, 0)" : "white",
                                                textTransform: 'capitalize',
                                                backgroundColor: 'rgba(0, 0, 0, .55)',
                                                pt: 1.5,
                                                pb: 1.5,
                                                fontSize: 14,
                                                fontFamily: 'Rubik',
                                                fontWeight: 400,
                                                width: '90%',
                                                borderRadius: 2,
                                                border: userSelection.season == details.season && userSelection.episodeNumber == index + 1 ? "2px solid rgba(162, 255, 0, 1)" : "1px solid rgba(162, 255, 0, 0.25)",
                                            }}
                                            onClick={() => { manageUserSelection(details.season, (index + 1)) }}>
                                            Episode {index + 1}</Button>
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