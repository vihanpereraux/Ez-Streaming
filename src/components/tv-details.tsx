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
                width: { xs: "100%", lg: "100%" },
                pl: { xs: .5, lg: 0 },
                mt: { xs: 1.5, lg: 3 }
            }}>
                <Typography
                    sx={{
                        color: 'white',
                        textAlign: 'left',
                        fontSize: 22,
                        fontFamily: 'Rubik',
                        fontWeight: 450,
                        mb: .8
                    }}>{props.original_name}</Typography>

                {/* other details */}
                <span style={{
                    color: 'white',
                    fontSize: 12,
                }}>
                    {/* first air data */}
                    {props.first_air_date ? props.first_air_date.slice(0, 4) : '...'} &nbsp; ⋅

                    {/* rating */}
                    &nbsp; <FaStar style={{ color: '#a2ff00' }} /> &nbsp;{Math.round(props.vote_average * 10) / 10} &nbsp;⋅
                </span>

                {/* genre */}
                &nbsp;&nbsp;{props.genres.map((genre: any, index: any) => (
                    <span key={index} style={{ color: 'white', fontFamily: 'Rubik', fontSize: 12, marginRight: 6 }}>{genre.name}</span>
                ))}
                <Typography
                    sx={{
                        fontFamily: 'Rubik',
                        fontSize: { xs: 14, lg: 14.5 },
                        lineHeight: 1.75,
                        fontWeight: 400,
                        mt: 2.5,
                        color: 'white',
                        opacity: 0.9,
                    }}>{props.overview}</Typography>
            </Box>
        </>
    )
}

export default TvDetails