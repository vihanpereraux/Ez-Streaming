import React from 'react'
import Carousel from "react-multi-carousel";
import { castCarouselConfig } from "../config/carousel-config";

// MUI
import { Typography, Box } from '@mui/material'

// props
interface props {
    contentTitle: string,
    castDetails: any[]
}

const Credits: React.FC<props> = ({ contentTitle, castDetails }) => {
    return (
        <>
            <Typography
                sx={{
                    fontWeight: 420,
                    fontFamily: 'Rubik',
                    color: 'white',
                    fontSize: { xs: '17px', lg: '17px' },
                }}>Cast of {contentTitle}</Typography>

            <Box sx={{ mt: { xs: 2, lg: 2.5 } }}>
                <Carousel responsive={castCarouselConfig} infinite={false}>
                    {castDetails.length > 0 ? (
                        [...castDetails].map((cast, index) => (
                            <Box key={index}
                                sx={{
                                    border: '1px solid rgb(40, 40, 40)',
                                    bgcolor: 'rgb(15, 15, 15)',
                                    height: 100,
                                    borderRadius: 3,
                                    p: 1.2,
                                    width: '98%',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                {/* cast image */}
                                <img style={{
                                    width: '30%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: 8,
                                    opacity: 1
                                }}
                                    src={`https://image.tmdb.org/t/p/w300/${cast.profile_path}.jpg`} alt="" />

                                <Box sx={{ ml: 1.75 }}>
                                    <Typography sx={{
                                        fontSize: 13,
                                        fontFamily: 'Rubik',
                                        mt: .55,
                                        opacity: 1,
                                        color: 'white',
                                        fontWeight: 400
                                    }}>{cast.name && cast.name.length > 25 ? cast.name.slice(0, 13) + ' ..' : cast.name} as</Typography>


                                    <Typography sx={{
                                        fontSize: 13.5,
                                        fontFamily: 'Rubik',
                                        fontWeight: 450,
                                        mt: 0,
                                        color: '#a2ff00'
                                    }}>{cast.character && cast.character.length > 25 ? cast.character.slice(0, 13) + ' ..' : cast.character}</Typography>
                                </Box>
                            </Box>
                        ))
                    ) : (<Typography sx={{
                        fontSize: 14,
                        fontFamily: 'Rubik',
                        color: 'white',
                        opacity: .75
                    }}>No cast available</Typography>)}

                </Carousel >
            </Box >
        </>
    )
}

export default Credits