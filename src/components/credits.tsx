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
                fontWeight: 400,
                fontFamily: 'Rubik',
                color: 'white',
                fontSize: { xs: 16, md: 15, lg: 15 },
            }}>Cast of {contentTitle}</Typography>

            <Box sx={{ mt: { xs: 2, lg: 2 } }}>
                <Carousel responsive={castCarouselConfig} infinite={false}>
                    {castDetails.length > 0 ? (
                        [...castDetails].map((cast, index) => (
                            <Box key={index}
                                sx={{
                                    bgcolor: { xs: 'rgb(16, 15, 15)', md: 'rgb(16, 15, 15)', lg: 'rgb(12, 12, 12)' },
                                    height: 100,
                                    borderRadius: 2,
                                    p: 1.25,
                                    width: '98%',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                {/* cast image */}
                                <Box sx={{
                                    width: 70,
                                    height: '100%',
                                    position: 'relative'
                                }}>
                                    <img style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: 8
                                    }}
                                        src={`https://image.tmdb.org/t/p/w300/${cast.profile_path}.jpg`}
                                        alt={`${cast.name} as ${cast.character}}`}
                                        onError={(e) => {
                                            (e.currentTarget as HTMLImageElement).src = 'https://media.istockphoto.com/id/1130424979/vector/person-gray-photo-placeholder-man.jpg?s=612x612&w=0&k=20&c=Oc5r-nuA8FxnBBFSa6azLq5bWDyPZlKNu-8qFrUDy5I=';
                                        }} />
                                </Box>
                                <Box sx={{ ml: 1.75 }}>
                                    <Typography sx={{
                                        fontSize: {xs: 11, md: 11, lg: 10.55},
                                        fontFamily: 'Rubik',
                                        mt: .55,
                                        opacity: .85,
                                        color: 'white',
                                        fontWeight: 380
                                    }}>{cast.name && cast.name.length > 25 ? cast.name.slice(0, 13) + ' ..' : cast.name} &nbsp;as</Typography>

                                    <Typography sx={{
                                        fontSize: {xs: 11, md: 11, lg: 10.55},
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
                                            fontSize: {xs: 11, md: 11, lg: 10.55},
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