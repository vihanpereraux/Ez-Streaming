import React from "react";

// MUI
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from "@mui/material";

// props
import { ReviewDataProps } from "../interfaces/props";
interface props {
    reviews: ReviewDataProps[],
    defaultExpanded: boolean
}

const Reviews: React.FC<props> = ({ reviews, defaultExpanded }) => {
    return (
        <>
            <Box>
                <Accordion defaultExpanded={defaultExpanded}
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
                            fontWeight: 420,
                            fontFamily: 'Rubik',
                            color: 'white',
                            fontSize: { xs: 17, lg: 16 },
                        }} component="span">Reviews & Critiques &nbsp; ·  &nbsp; <span style={{ opacity: .7, fontSize: 15 }}>
                                {reviews.length.toString()} {reviews.length > 1 ? "Reviews" : "Review"}</span></Typography>
                    </AccordionSummary>

                    <AccordionDetails sx={{
                        background: 'rgba(0, 0, 0, 0.25)',
                        borderRadius: 3,
                        pt: 2,
                        pl: 0, pr: 0
                    }}>
                        {reviews.length > 0 ? reviews.map((review, index) => (
                            <Box key={index}
                                sx={{
                                    color: 'white',
                                    mt: { xs: -2, lg: -2.5 },
                                    mb: 4,
                                    bgcolor: 'rgb(16, 16, 16)',
                                    p: 2,
                                    borderRadius: 3,
                                }}>
                                {/* user */}
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontFamily: 'Rubik',
                                        fontSize: 14.5,
                                        fontWeight: 450
                                    }}>{review.authorUsername}</Typography>

                                {/* last edited date */}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontFamily: 'Rubik',
                                        fontSize: 11,
                                        fontWeight: 400,
                                        mt: .55,
                                        mb: 1.25,
                                        opacity: .7
                                    }}>{new Date(review.date).toLocaleDateString()}</Typography>

                                {/* review */}
                                <Typography sx={{
                                    fontFamily: 'Rubik',
                                    fontSize: { xs: 13, lg: 13 },
                                    lineHeight: 1.65,
                                    fontWeight: 360,
                                    color: 'white',
                                    opacity: 0.85,
                                }}
                                    component="span"
                                    dangerouslySetInnerHTML={{
                                        __html: review.review.replace(
                                            /(https?:\/\/[^\s]+)/g,
                                            '<a href="$1" style="color:#a2ff00;text-decoration:underline;" target="_blank" rel="noopener noreferrer">$1</a>'
                                        )
                                    }}
                                />
                            </Box>
                        )) : (
                            <Typography sx={{
                                fontSize: 13,
                                fontFamily: 'Rubik',
                                color: 'white',
                                opacity: .75,
                                textAlign: 'center'
                            }}>No reviews available</Typography>
                        )}
                    </AccordionDetails>
                </Accordion>
            </Box>
        </>
    )
}

export default Reviews