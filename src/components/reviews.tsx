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
            <div>
                <Accordion
                    defaultExpanded={defaultExpanded}
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
                        }} component="span">Reviews & Discussions &nbsp; <span style={{ opacity: .7, fontSize: 15 }}>({reviews.length.toString()} Reviews)</span></Typography>
                    </AccordionSummary>

                    <AccordionDetails sx={{
                        background: 'rgba(0, 0, 0, 0.25)',
                        borderRadius: 3,
                        pt: 2
                    }}>
                        {reviews.length > 0 ? reviews.map((review, index) => (
                            <Box key={index}
                                sx={{
                                    color: 'white',
                                    mt: 0,
                                    mb: 4
                                }}>
                                {/* user */}
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontFamily: 'Rubik',
                                        fontSize: 15,
                                        fontWeight: 500
                                    }}>{review.authorUsername}</Typography>

                                {/* last edited data */}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontFamily: 'Rubik',
                                        fontSize: 12,
                                        fontWeight: 400,
                                        mt: 1,
                                        mb: 1.5,
                                        opacity: .7
                                    }}>{new Date(review.date).toLocaleDateString()}</Typography>

                                {/* review */}
                                <Typography
                                    sx={{
                                        fontSize: 15,
                                        fontFamily: 'Rubik',
                                        fontWeight: 350,
                                        lineHeight: 1.7,
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
                                fontSize: 14,
                                fontFamily: 'Rubik',
                                color: 'white',
                                opacity: .75
                             }}>No reviews available</Typography>
                        )}
                    </AccordionDetails>
                </Accordion>
            </div >
        </>
    )
}

export default Reviews