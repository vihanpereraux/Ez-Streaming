import React from "react";

// MUI
import { Typography, Box } from "@mui/material";
import { FaStar } from "react-icons/fa6";

// props
interface TvDetailsProps {
    props: {
        original_name: string,
        first_air_date: string,
        vote_average: number,
        overview: string,
        genres: any[],
    }
}

const TvDetails: React.FC<TvDetailsProps> = ({ props }) => {
    return (
        <>
            <Box sx={{
                bgcolor: { xs: 'rgb(18, 18, 18)', md: 'rgb(16, 15, 15)', lg: 'rgb(10, 10, 10)' },
                p: 2,
                borderRadius: 3,
            }}>
                <Typography
                    sx={{
                        color: 'white',
                        textAlign: 'left',
                        fontSize: { xs: 16, lg: 17.5 },
                        fontFamily: 'Rubik',
                        fontWeight: 420,
                        mb: .25,
                    }}>{props.original_name}</Typography>

                {/* other details */}
                <span style={{
                    color: 'white',
                    fontSize: window.innerWidth > 600 ? 11 : 11,
                    display: "inline-flex",
                    alignItems: "center",
                    fontFamily: 'Rubik',
                    opacity: .75,
                }}>
                    {/* first air data */}
                    {props.first_air_date ? props.first_air_date.slice(0, 4) : '...'} &nbsp; ⋅

                    {/* rating */}
                    &nbsp; <FaStar style={{ color: '#a2ff00' }} /> &nbsp;{Math.round(props.vote_average * 10) / 10} &nbsp;⋅
                </span>

                {/* genre */}
                &nbsp;&nbsp;{props.genres.map((genre: any, index: any) => (
                    <span key={index} style={{ color: 'white', fontFamily: 'Rubik', fontSize: 11, marginRight: 6, opacity: .75, }}>{genre.name}</span>
                ))}
                <Typography sx={{
                    fontFamily: 'Rubik',
                    fontSize: { xs: 13.5, lg: 13.5 },
                    lineHeight: 1.75,
                    fontWeight: 380,
                    mt: 1.75,
                    color: 'white',
                    opacity: 0.9,
                }}>{props.overview}</Typography>
            </Box>
        </>
    )
}

export default TvDetails