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
            <Typography sx={{
                fontWeight: 420,
                fontFamily: 'Rubik',
                color: 'white',
                fontSize: { xs: 17, lg: 17.5 },
            }}>Cast of {contentTitle}</Typography>

            <Box sx={{ mt: { xs: 2, lg: 2.5 } }}>
                <Carousel responsive={castCarouselConfig} infinite={false}>
                    {castDetails.length > 0 ? (
                        [...castDetails].map((cast, index) => (
                            <Box key={index}
                                sx={{
                                    bgcolor: 'rgb(16, 16, 16)',
                                    height: 100,
                                    borderRadius: 3,
                                    p: 1.2,
                                    width: '98%',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                {/* cast image */}
                                <img style={{
                                    width: '28%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: 8,
                                    opacity: 1,
                                    aspectRatio: 1
                                }} src={`https://image.tmdb.org/t/p/w300/${cast.profile_path}.jpg`} alt="" />

                                <Box sx={{ ml: 1.75 }}>
                                    <Typography sx={{
                                        fontSize: 12,
                                        fontFamily: 'Rubik',
                                        mt: .55,
                                        opacity: .8,
                                        color: 'white',
                                        fontWeight: 400
                                    }}>{cast.name && cast.name.length > 25 ? cast.name.slice(0, 13) + ' ..' : cast.name} &nbsp;as</Typography>

                                    <Typography sx={{
                                        fontSize: 13.5,
                                        fontFamily: 'Rubik',
                                        fontWeight: 420,
                                        mt: .25,
                                        color: 'white'
                                    }}>{cast.character && cast.character.length > 25 ? cast.character.slice(0, 13) + ' ..' : cast.character}</Typography>

                                    <Typography
                                        onClick={() => {
                                            window.open(`https://www.google.com/search?q=${encodeURIComponent(cast.name + ' ' + ' reddit')}`, '_blank');
                                        }}
                                        sx={{
                                            fontSize: 12.5,
                                            fontFamily: 'Rubik',
                                            fontWeight: 420,
                                            mt: 1,
                                            color: 'white',
                                            cursor: 'pointer'
                                        }}>Explore more on <span style={{ color: 'orangered' }}>&nbsp; r/Reddit</span></Typography>

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