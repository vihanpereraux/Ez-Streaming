import React from 'react'
import Carousel from "react-multi-carousel";
import { castCarouselConfig } from "../config/CarouselConfig";

// MUI
import { Typography, Box } from '@mui/material'

// props
interface props {
    castDetails: any[]
}

const Credits: React.FC<props> = ({ castDetails }) => {
    return (
        <>
            <Typography
                sx={{
                    fontWeight: 450,
                    fontFamily: 'Rubik',
                    color: 'white',
                    fontSize: { xs: '16px', lg: '18px' },
                }}>Cast</Typography>

            <Box sx={{ mt: 3 }}>
                <Carousel responsive={castCarouselConfig} infinite={true}>
                    {[...castDetails].reverse().map((cast, index) => (
                        <Box key={index}
                            sx={{
                                // border: '1px solid red',
                                width: '95%',
                                textAlign: 'center'
                            }}>
                            <img style={{
                                width: 90,
                                height: 90,
                                objectFit: 'cover',
                                aspectRatio: 1,
                                borderRadius: '50%'
                            }} src={`https://image.tmdb.org/t/p/w300/${cast.profile_path}.jpg`} alt={cast.name} loading="lazy" />
                            <Box sx={{ color: 'white' }}>
                                <Typography sx={{
                                    fontSize: 13.5,
                                    fontFamily: 'Rubik',
                                    fontWeight: 450,
                                    mt: 1
                                }}>{cast.character && cast.character.length > 20 ? cast.character.slice(0, 13) + ' ..' : cast.character}</Typography>
                                <Typography sx={{
                                    fontSize: 12.5,
                                    fontFamily: 'Rubik',
                                    mt: .55,
                                    opacity: .75,
                                    color: '#a2ff00'
                                }}>{cast.name && cast.name.length > 20 ? cast.name.slice(0, 13) + ' ..' : cast.name}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Carousel>
            </Box>
        </>
    )
}

export default Credits