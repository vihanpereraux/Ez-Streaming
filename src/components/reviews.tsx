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
    reviews: ReviewDataProps[]
}

const Reviews: React.FC<props> = ({ reviews }) => {
    return (
        <>
            <div>
                <Accordion
                    defaultExpanded
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
                        }} component="span">Reviews & Discussions ({reviews.length.toString()})</Typography>
                    </AccordionSummary>

                    <AccordionDetails sx={{
                        background: 'rgba(0, 0, 0, 0.25)',
                        borderRadius: 3,
                        pt: 2
                    }}>
                        {reviews && reviews.map((review, index) => (
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
                                        opacity: .7
                                    }}>{new Date(review.date).toLocaleDateString()}</Typography>

                                {/* review */}
                                <Typography
                                    sx={{
                                        fontSize: 16,
                                        fontFamilly: 'Rubik',
                                        fontWeight: 450,
                                        lineHeight: 1.7,
                                        mt: 1.5
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
                        ))}
                    </AccordionDetails>
                </Accordion>
            </div >
        </>
    )
}

export default Reviews